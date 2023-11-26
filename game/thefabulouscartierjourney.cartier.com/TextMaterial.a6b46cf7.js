var v=Object.defineProperty;var u=(n,e,r)=>e in n?v(n,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):n[e]=r;var s=(n,e,r)=>(u(n,typeof e!="symbol"?e+"":e,r),r);import{bn as l,a$ as f,ao as m}from"./vendors/vendors.a233fc08.js";import{h as o,i as a}from"./app.0ebd139a.js";const d=`#define saturate(t) clamp(t, 0.0, 1.0)
const float mulValue = 1.;
const float powerValue = 3.;
uniform vec2 res;
uniform sampler2D tNoise;
uniform vec3 color;
uniform vec3 uCityCenter;
varying vec3 vCameraDirection;
varying float vCameraDistance;
varying vec2 vUv;
#include <packing>
#include <fog_pars_fragment>
#include <ascendfog_pars_fragment>
#include <dithering_pars_fragment>
float getScatter(vec3 cameraPos, vec3 dir, vec3 lightPos, float d) {
    vec3 q = cameraPos - lightPos;
    float b = dot(dir, q);
    float c = dot(q, q);
    float t = c - b*b;
    float s = 1. / sqrt(max(.0001, t));
    float l = s * (atan((d+b) * s) - atan(b*s));
    return pow(max(0., l * mulValue), powerValue);
}
void main() {
vec3 col = color;
vec2 st = gl_FragCoord.xy / res.xy;
gl_FragColor = vec4(col, 1);
gl_FragColor.rgb += (texture2D(tNoise, st * 10.).r * 2. - 1.) * .1;
#include <colorspace_fragment>
#include <ascendfog_fragment>
#include <fog_fragment>
gl_FragColor.a *= 1. - fogFactor * fogFactor * fogFactor;
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,g=o(d,"fragmentShader"),p=`#include <fog_pars_vertex>
#include <ascendfog_pars_vertex>
varying vec2 vUv;
varying vec3 vCameraDirection;
varying float vCameraDistance;
void main() {
vec4 worldPosition = modelMatrix * vec4(position, 1.0);
vec4 mvPosition = viewMatrix * worldPosition;
gl_Position = projectionMatrix * mvPosition;
#include <ascendfog_vertex>
#include <fog_vertex>
vec3 cameraDiff = cameraPosition - mvPosition.xyz;
vCameraDirection = normalize(cameraDiff);
vCameraDistance = length(cameraDiff);
vUv = uv;
}`,h=o(p,"vertexShader");class w extends l{constructor({color:r,uniforms:i={},defines:t={},...c}={}){super(c);s(this,"name","GroundMaterial");this.defines||(this.defines={}),Object.assign(this.defines,t),this.uniforms={color:{value:r},tNoise:{value:a.$assets.textures.dirtyNoise},res:a.$renderer.drawingBufferSize,...f.fog,...i},this.transparent=!0,g.use(this),h.use(this)}}const x=`#define saturate(a) clamp( a, 0.0, 1.0 )
uniform sampler2D tMap;
uniform vec3 color;
uniform float alpha;
varying vec2 vUv;
uniform sampler2D tWorley;
uniform sampler2D tNoise;
uniform float time;
uniform float progress;
float Cloud(vec2 uv) {
vec3 noise   = texture2D(tNoise, (uv + vec2(time * .00004, 0.))).rgb;
float worley = (texture2D(tWorley, uv * .125).b + noise.b) * .625;
worley -= (texture2D(tWorley, uv * .125).g + noise.g) * .25;
worley -= (texture2D(tWorley, uv * .125).r + noise.r) * .25;
return saturate(1. - worley) * 2. - 1.;
}
void main() {
gl_FragColor = texture2D(tMap, vUv);
gl_FragColor.rgb = color;
gl_FragColor.a *= (saturate(Cloud(vUv) * 2.) + smoothstep(-.5, .5, vUv.x) - (1. - progress) * 2.) * alpha;
if (gl_FragColor.a <= 0.) discard;
}`,_=o(x,"fragmentShader"),y=`varying vec2 vUv;
void main() {
vUv = uv;
vec4 zero = vec4(0.0, 0.0, 0.0, 1.0);
vec4 transformed = vec4(position, 1.0);
vec3 scale = vec3(
length(vec3(modelMatrix[0][0], modelMatrix[0][1], modelMatrix[0][2])),
length(vec3(modelMatrix[1][0], modelMatrix[1][1], modelMatrix[1][2])),
length(vec3(modelMatrix[2][0], modelMatrix[2][1], modelMatrix[2][2]))
);
vec4 mvPosition = modelViewMatrix * zero;
mvPosition.x += transformed.x * scale.x;
mvPosition.y += transformed.y * scale.y;
gl_Position = projectionMatrix * mvPosition;
}`,M=o(y,"vertexShader");class b extends l{constructor({map:e,alpha:r=1,color:i=16777215,...t}={}){super(t),this.uniforms={tMap:{value:e},alpha:{value:r},color:{value:new m(i)},tWorley:{value:a.$assets.textures.worleyNoise},tNoise:{value:a.$assets.textures.perlinNoise},time:a.uniforms.time,res:a.$renderer.drawingBufferSize,pr:a.$renderer.pixelRatio,...t.uniforms},this.transparent=!0,this.depthWrite=!1,_.use(this),M.use(this)}get progress(){return this.uniforms.progress.value}set progress(e){this.uniforms.progress.value=e}get alpha(){return this.uniforms.alpha.value}set alpha(e){this.uniforms.alpha.value=e}}export{w as G,b as T};
