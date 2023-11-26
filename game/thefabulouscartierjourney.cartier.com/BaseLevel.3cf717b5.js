var St=Object.defineProperty;var Mt=(s,e,n)=>e in s?St(s,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[e]=n;var U=(s,e,n)=>(Mt(s,typeof e!="symbol"?e+"":e,n),n);import{bG as _,al as b,ao as m,bn as H,a$ as ve,bB as Tt,aQ as p,b5 as ie,bz as ee,ap as y,aF as Ue,bk as At,bg as Ne,aX as Ct,bl as q,b6 as ct,aS as qe,bi as zt,bj as Dt,bp as $t,cc as ut,aP as Et,aE as Me,aD as Ve,af as It,cd as kt,aU as d,bK as Ft,m as Te,ce as N,b3 as C,bt as A,aa as I,cf as ae,aV as ne,O as k,aZ as ge,b2 as Ae,cg as We,an as Se,aY as Ut,aR as fe,bx as qt,q as Nt,aT as Le,ch as ht,ci as Lt,cj as Ot,aW as ft,bN as Rt,ck as Bt,cl as Vt,by as Wt,b7 as Ge,bD as Ce,ca as dt,bm as Gt,cm as Xt}from"./vendors/vendors.a233fc08.js";import{h as P,i as c,B as O,c as mt,P as Yt,a as oe,d as Ht,e as Zt,w as Y,f as de,j as Oe,k as Re,S as E,l as Be,m as jt,M as Qt,n as Kt,Z as Jt,o as es}from"./app.0ebd139a.js";class Di{constructor(e="ascendFog",{color:n=13076336,density:t=1,offset:i=0,frequency:o=.002,amplitude:a=1,speed:l=1,lacunarity:r=1,gain:u=1}={}){this.color=_(b(n),e+"_ascendFogColor"),this.density=_(b(t),e+"_ascendFogDensity"),this.offset=_(b(i),e+"_ascendFogOffset"),this.frequency=_(b(o),e+"_ascendfogfrequency"),this.amplitude=_(b(a),e+"_ascendFogAmplitude"),this.speed=_(b(l),e+"_ascendFogSpeed"),this.lacunarity=_(b(r),e+"_ascendFogLacunarity"),this.gain=_(b(u),e+"_ascendFogGain"),this.time={value:0},this.uniforms={ascendFogColor:{value:new m().setHex(this.color.get())},ascendFogDensity:this.density,ascendFogOffset:this.offset,ascendFogFrequency:this.frequency,ascendFogAmplitude:this.amplitude,ascendFogSpeed:this.speed,ascendFogLacunarity:this.lacunarity,ascendFogGain:this.gain,ascendFogTime:this.time},this.defines={USE_ASCEND_FOG:!0}}update(e){this.time.value+=e*this.speed.get()}}const ts=`#define saturate(t) clamp(t, 0., 1.)
#define PI 3.14159265359
#define PI2 PI * 2.
uniform sampler2D atlas;
uniform sampler2D tDepth;
uniform sampler2D tPlayer;
uniform vec2 res;
uniform vec3 color;
uniform float zNear;
uniform float zFar;
uniform float depthTransition;
uniform float density;
uniform vec3 playerPos;
uniform vec3 lightColor;
uniform float lightIntensity;
varying float vLightDistance;
varying vec3 vWorldPosition;
varying float vAlpha;
varying float vType;
varying vec3 vNormal;
varying vec2 vUv;
const float BLUR_SAMPLES = 6.;
highp float rand( const in vec2 uv ) {
const highp float a = 12.9898, b = 78.233, c = 43758.5453;
highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
return fract( sin( sn ) * c );
}
#include <packing>
#include <fog_pars_fragment>
#include <ascendfog_pars_fragment>
#include <dithering_pars_fragment>
#ifdef USE_ENVMAP
uniform samplerCube envMap;
uniform float envMapIntensity;
uniform float reflectivity;
#endif
#ifdef USE_EMPTY_AREAS
varying float vEmptyAreaAlpha;
#endif
#ifndef USE_ASCEND_FOG
uniform sampler2D tNoise;
#endif
float pow2( const in float x ) { return x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float getDistanceAttenuation( const in float lightDistance, const in float decayExponent ) {
float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
return distanceFalloff;
}
float cubicIn(float t) {
  return t * t * t;
}
float calc_depth(float z) {
float near = zNear;
float far = zFar;
return (2.0 * near) / (far + near - z * (far - near));
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 computeEnvMap(vec3 _d, float _envmapFactor) {
vec3 diffuseColor = _d;
#ifdef USE_ENVMAP
vec3 cameraToFrag = normalize(vWorldPosition - cameraPosition);
vec3 worldNormal = inverseTransformDirection( vNormal, viewMatrix );
vec3 reflectVec = reflect( cameraToFrag, worldNormal );
vec4 envColor = textureCube( envMap, vec3( -1. * reflectVec.x, reflectVec.yz ) );
diffuseColor.rgb = mix( diffuseColor.rgb, diffuseColor.rgb + envColor.rgb * envMapIntensity, reflectivity );
#endif
return diffuseColor;
}
void main() {
vec2 st = gl_FragCoord.xy / res;
float px = 1. / res.x;
vec4 depth = texture2D(tDepth, st);
vec3 normal = vec3(0., .1, 0.);
vec4 diffuseColor = vec4(color, 1.0);
float alpha = texture2D(atlas, vUv).a;
diffuseColor.a *= saturate(alpha);
diffuseColor.a *= vType;
diffuseColor.a *= vAlpha;
#ifdef USE_EMPTY_AREAS
diffuseColor.a *= vEmptyAreaAlpha;
#endif
diffuseColor.rgb = computeEnvMap(diffuseColor.rgb, 1.);
diffuseColor.rgb = diffuseColor.rgb + lightColor * getDistanceAttenuation(vLightDistance, lightIntensity);
diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.5, pow(saturate(1. - (length(playerPos - vWorldPosition)) + diffuseColor.a) * diffuseColor.a, 1.1));
diffuseColor.a = saturate(diffuseColor.a * density);
if (diffuseColor.a <= 0.001) discard;
normal.y += diffuseColor.a;
gl_FragColor = diffuseColor;
#include <colorspace_fragment>
#include <ascendfog_fragment>
#include <fog_fragment>
gl_FragColor.a *= 1. - fogFactor;
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,ss=P(ts,"fragmentShader"),ns=`#define PI 3.14159265359
#define saturate(t) clamp(t, 0.0, 1.0)
varying vec3 vViewPosition;
uniform sampler2D atlas;
uniform sampler2D tNoise;
uniform vec4 boundaries;
uniform float cameraOffset;
uniform float wind;
uniform float time;
uniform float noiseAmplitude;
uniform float noiseFrequency;
uniform vec3 gamecamPos;
uniform vec3 lightPosition;
varying float vYOffset;
varying vec3 vWorldPosition;
varying vec2 vUv;
attribute float aRand;
attribute float aSprite;
attribute float aType;
varying vec3 vNormal;
varying vec3 vDisp;
varying float vLightDistance;
varying float vRand;
varying float vType;
varying float vAlpha;
#ifdef USE_EMPTY_AREAS
uniform sampler2D tEmptyAreas;
uniform vec4 uEmptyAreasTransform;
varying float vEmptyAreaAlpha;
#endif
#include <fog_pars_vertex>
#include <ascendfog_pars_vertex>
#include <envmap_pars_vertex>
#include <invlerp>
#include <wrap>
mat4 t3D(vec3 t) {
return mat4(1., 0., 0., 0.,
0., 1., 0., 0.,
0., 0., 1., 0.,
t.x, t.y, t.z, 1.
);
}
void main() {
mat4 m = instanceMatrix;
vec3 transformed = position;
vec3 transformedNormal = normal;
vec4 zero = vec4(0., 0., 0., 1.);
vAlpha = 1.;
vec3 parentPosition = (modelMatrix * zero).xyz;
vec3 instancePosition = (instanceMatrix * zero).xyz;
vec4 instanceWorldPosition = modelMatrix * vec4(instancePosition, 1.0);
vec4 worldPosition = modelViewMatrix * instanceMatrix * zero;
vec2 worldUV = invLerp(boundaries.xy, boundaries.zw, instancePosition.xz);
vec3 scale = vec3(
length(vec3(m[0][0], m[0][1], m[0][2])),
length(vec3(m[1][0], m[1][1], m[1][2])),
length(vec3(m[2][0], m[2][1], m[2][2]))
);
mat3 _m = mat3(instanceMatrix);
transformedNormal /= vec3( dot( _m[ 0 ], _m[ 0 ] ), dot( _m[ 1 ], _m[ 1 ] ), dot( _m[ 2 ], _m[ 2 ] ) );
transformedNormal = _m * transformedNormal;
transformedNormal = normalMatrix * transformedNormal;
float fadeInOut = sin(mod(wind * 30. * .1 * (aRand * 2. + 1.) + (aSprite - aType) * PI, 2. * PI) + aRand * 239.32) * .5 + .5;
transformed *= fadeInOut * .1 + .9 ;
vec3 disp = vec3(cameraOffset , 0., 0.);
float speedFactor = smoothstep(0., .5, worldUV.y);
float offsetX = wrap(boundaries.x, boundaries.z, instancePosition.x + disp.x);
float yOffsetFactor = smoothstep(boundaries.y * .8, boundaries.w * .5, instancePosition.z);
float yOffset = (texture2D(tNoise, worldUV + vec2(wind) * 0.01) * speedFactor).r;
scale *= 1. + smoothstep(-4., 4., cameraPosition.y) * .3;
vAlpha *= (smoothstep(boundaries.x, boundaries.x + 5., offsetX) - smoothstep(boundaries.z - 5., boundaries.z, offsetX));
#ifdef USE_EMPTY_AREAS
vec2 emptyAreaMin = ((uEmptyAreasTransform.xy - uEmptyAreasTransform.zw * .6));
vec2 emptyAreaMax = ((uEmptyAreasTransform.xy + uEmptyAreasTransform.zw * .6));
vec2 uvEmptyArea = saturate(invLerp(emptyAreaMin, emptyAreaMax, instanceWorldPosition.xz + vec2( offsetX - instancePosition.x, 0.)));
uvEmptyArea.y = 1. - uvEmptyArea.y;
vEmptyAreaAlpha = 1. - texture2D(tEmptyAreas, (uvEmptyArea)).r;
scale *= vEmptyAreaAlpha;
#endif
m = t3D(vec3(offsetX - instancePosition.x, (yOffset * 2. - 1.) * noiseAmplitude * yOffsetFactor, 0.)) * m;
vec4 bbPosition = modelMatrix * m * zero;
bbPosition = viewMatrix * bbPosition;
bbPosition.x += transformed.x * scale.x;
bbPosition.y += transformed.y * scale.y;
vec3 mvPosition = bbPosition.xyz;
vWorldPosition  = instanceWorldPosition.xyz;
vWorldPosition += vec3(
transformed.x * scale.x + offsetX - instancePosition.x,
transformed.y * scale.y + (yOffset * 2. - 1.) * noiseAmplitude * yOffsetFactor,
0.
);
vLightDistance = distance(lightPosition, bbPosition.xyz - (modelViewMatrix * zero).xyz);
vType = fadeInOut;
gl_Position = projectionMatrix * bbPosition;
#include <ascendfog_vertex>
#include <fog_vertex>
vUv = uv;
vRand = aRand;
vNormal = normalize(transformedNormal);
}`,is=P(ns,"vertexShader");class os extends H{constructor({uniforms:n={},defines:t={},atlas:i,...o}={}){super(o);U(this,"name","CloudMaterial");this.uniforms={...n,...ve.fog,atlas:{value:i.texture},res:c.$renderer.drawingBufferSize},this.premultipliedAlpha=!0,this.fog=!0,this.defines||(this.defines={}),Object.assign(this.defines,{USE_FOG:"",USE_INSTANCING:"",...t}),n.envMap&&(this.defines.USE_ENVMAP=""),ss.use(this),is.use(this)}}const as=`precision highp float;
#define saturate(t) clamp(t, 0.0, 1.0)
#define tau 6.28318530718
#define BLUR_SAMPLES 10
#include <packing>
uniform sampler2D tClouds;
uniform sampler2D tPlayer;
uniform sampler2D tPlayerDepth;
uniform sampler2D tCloudsDepth;
uniform sampler2D tAlpha;
uniform sampler2D tDepth;
varying vec2 vUv;
uniform vec2 res;
uniform vec3 cameraPosition;
varying vec3 vPosition;
float calc_depth(float z, float n, float f) {
float near = n;
float far = f;
return (2.0 * near) / (far + near - z * (far - near));
}
vec4 blur( sampler2D image, vec2 uv, float force ){
vec4 color = vec4(0);
float d = 0.;
#pragma unroll_loop_start
for ( int i = 0; i < BLUR_SAMPLES; i ++ ) {
d = tau * (float(i) / float(BLUR_SAMPLES));
color += texture2D(image, uv + vec2(cos(d), sin(d)) * force);
}
#pragma unroll_loop_end
color /= float(BLUR_SAMPLES);
return color;
}
void main() {
vec2 st = gl_FragCoord.xy / res.xy;
vec4 player = texture2D(tPlayer, st);
vec4 playerDepthTexture = texture2D(tPlayerDepth, st);
vec4 scene  = texture2D(tDepth, st);
vec4 clouds = texture2D(tClouds, st);
vec4 cloudsDepthTexture = texture2D(tCloudsDepth, st);
float sceneZ = unpackRGBAToDepth(scene);
float playerZ = playerDepthTexture.r;
float blurredScene = blur(tDepth, st, 0.003).a;
float playerDepth = viewZToPerspectiveDepth(playerZ, 1., 10.);
float sceneDepth = viewZToPerspectiveDepth(sceneZ, 1., 10.);
float playerAlpha = player.a;
float sceneAlpha = texture2D(tAlpha, st).a;
float alpha = smoothstep(0., 0.5, viewZToPerspectiveDepth(min(0., unpackRGBAToDepth(scene) - playerZ + player.a), 1., 20.));
float negativeAlpha = saturate(player.a * (smoothstep(.96, .95, scene.a)));
alpha = smoothstep(0., 0.001, saturate(playerDepth - sceneDepth)) * player.a
;
gl_FragColor = mix(clouds, player, alpha);
gl_FragColor *= sceneAlpha - playerAlpha;
}`,rs=P(as,"fragmentShader"),ls=`precision highp float;
attribute lowp vec2 position;
varying highp vec2 vUv;
uniform mat4 modelViewMatrix;
varying vec3 vPosition;
void main() {
vUv = position * 0.5 + 0.5;
gl_Position = vec4(position, 0., 1);
vPosition = vec3(modelViewMatrix * vec4(position, 0., 1.));
}`,cs=P(ls,"vertexShader");class us extends Tt{constructor({uniforms:n={},defines:t={},...i}={}){super(i);U(this,"name","ImpostorMaterial");this.uniforms={...n},this.defines||(this.defines={}),Object.assign(this.defines,{...t}),rs.use(this),cs.use(this)}}const hs=`uniform sampler2D atlas;
uniform sampler2D tDepth;
uniform vec2 res;
varying vec2 vUv;
uniform float zNear;
uniform float zFar;
uniform float depthTransition;
varying float vAlpha;
varying float vType;
float calc_depth(float z) {
float near = zNear;
float far = zFar;
return (2.0 * near) / (far + near - z * (far - near));
}
#ifdef USE_EMPTY_AREAS
varying float vEmptyAreaAlpha;
#endif
#ifndef USE_ASCEND_FOG
uniform sampler2D tNoise;
#endif
#include <common>
#include <packing>
#include <fog_pars_fragment>
void main() {
vec2 st = gl_FragCoord.xy / res.xy;
vec4 diffuseColor = vec4( 1.0 );
vec4 depth = texture2D(tDepth, st);
float geometryZ = calc_depth(unpackRGBAToDepth(depth));
float sceneZ = calc_depth(gl_FragCoord.z);
float softAlpha = smoothstep(0., depthTransition, saturate(geometryZ - sceneZ));
float alpha = texture2D(atlas, vUv).a;
alpha = saturate(alpha * softAlpha) * vType * vAlpha;
#ifdef USE_EMPTY_AREAS
alpha *= vEmptyAreaAlpha;
#endif
#include <fog_fragment>
gl_FragColor = vec4(alpha);
gl_FragColor.a *= 1. - fogFactor;
}`,fs=P(hs,"fragmentShader"),ds=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#include <fog_pars_vertex>
#include <invlerp>
#include <wrap>
varying vec2 vUv;
varying float vType;
varying float vAlpha;
uniform sampler2D tNoise;
attribute float aRand;
attribute float aSprite;
attribute float aType;
uniform vec4 boundaries;
uniform float cameraOffset;
uniform float wind;
uniform float noiseAmplitude;
uniform float noiseFrequency;
#ifdef USE_EMPTY_AREAS
uniform sampler2D tEmptyAreas;
uniform vec4 uEmptyAreasTransform;
varying float vEmptyAreaAlpha;
#endif
mat4 t3D(vec3 t) {
return mat4(1., 0., 0., 0.,
0., 1., 0., 0.,
0., 0., 1., 0.,
t.x, t.y, t.z, 1.
);
}
void main() {
mat4 m = instanceMatrix;
vec4 zero = vec4(0, 0, 0, 1);
vAlpha = 1.;
vec3 parentPosition = (modelMatrix * zero).xyz;
vec3 instancePosition = (instanceMatrix * zero).xyz;
vec4 instanceWorldPosition = modelMatrix * vec4(instancePosition, 1.0);
vec4 worldPosition = modelViewMatrix * instanceMatrix * zero;
vec2 worldUV = invLerp(boundaries.xy, boundaries.zw, instancePosition.xz);
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
vec3 scale = vec3(
length(vec3(instanceMatrix[0][0], instanceMatrix[0][1], instanceMatrix[0][2])),
length(vec3(instanceMatrix[1][0], instanceMatrix[1][1], instanceMatrix[1][2])),
length(vec3(instanceMatrix[2][0], instanceMatrix[2][1], instanceMatrix[2][2]))
);
float fadeInOut = sin(mod(wind * 30. * .1 * (aRand * 2. + 1.) + (aSprite - aType) * PI, 2. * PI) + aRand * 239.32) * .5 + .5;
transformed *= fadeInOut * .1 + .9 ;
float speedFactor = smoothstep(0., .5, worldUV.y);
vec3 disp = vec3(cameraOffset , 0., 0.);
float offsetX = wrap(boundaries.x, boundaries.z, instancePosition.x + disp.x);
float yOffsetFactor = smoothstep(boundaries.y * .8, boundaries.w * .5, instancePosition.z);
float yOffset = (texture2D(tNoise, worldUV + vec2(wind) * 0.01) * speedFactor).r;
scale *= 1. + smoothstep(-4., 4., cameraPosition.y) * .3;
vAlpha *= (smoothstep(boundaries.x, boundaries.x + 5., offsetX) - smoothstep(boundaries.z - 5., boundaries.z, offsetX));
#ifdef USE_EMPTY_AREAS
vec2 emptyAreaMin = ((uEmptyAreasTransform.xy - uEmptyAreasTransform.zw * .6));
vec2 emptyAreaMax = ((uEmptyAreasTransform.xy + uEmptyAreasTransform.zw * .6));
vec2 uvEmptyArea = saturate(invLerp(emptyAreaMin, emptyAreaMax, instanceWorldPosition.xz + vec2( offsetX - instancePosition.x, 0.)));
uvEmptyArea.y = 1. - uvEmptyArea.y;
vEmptyAreaAlpha = 1. - texture2D(tEmptyAreas, (uvEmptyArea)).r;
scale *= vEmptyAreaAlpha;
#endif
m = t3D(vec3(offsetX - instancePosition.x, (yOffset * 2. - 1.) * noiseAmplitude * yOffsetFactor, 0.)) * m;
vec4 bbPosition = modelMatrix * m * zero;
bbPosition = viewMatrix * bbPosition;
bbPosition.x += transformed.x * scale.x;
bbPosition.y += transformed.y * scale.y;
vec3 mvPosition = bbPosition.xyz;
gl_Position = projectionMatrix * bbPosition;
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
vType = fadeInOut;
vUv = uv;
}`,ms=P(ds,"vertexShader");class ps extends H{constructor({uniforms:n={},defines:t={},atlas:i,...o}={}){super(o);U(this,"name","CloudAlphaMaterial");this.uniforms={...n,...ve.fog,atlas:{value:i.texture}},this.transparent=!0,this.premultipliedAlpha=!0,this.fog=!0,this.defines||(this.defines={}),Object.assign(this.defines,{USE_FOG:"",USE_INSTANCING:"",...t}),n.envMap&&(this.defines.USE_ENVMAP=""),fs.use(this),ms.use(this)}}const be=new ct,vs=new p;class $i extends O{init(){const{$game:e,$assets:n,$store:t,$renderer:i,$viewport:o,$quality:a}=this.webgl,{density:l=8,repartition:r=60,windSpeed:u=.42,scales:h={x:10,y:16},noiseAmplitude:g=4.3,noiseFrequency:v=.08,offsetY:f=-1,name:w="CloudsLayer",boundaries:S=t.boundariesUniforms.value,ascendFog:M,emptyAreas:F,color:Z=4204611,lightColor:B=16761497,lightPosition:z=new p(11,9,41),reflectivity:x=1,envMapIntensity:T=1,lightIntensity:$=.3,layers:L=3,cloudsSmoothness:V=.03,uniforms:R={},defines:W={}}=this.props;this.name=w,this.base=new ie,this.color=_(b(Z),this.name+"_clouds_color"),this.lightColor=_(b(B),this.name+"_clouds_lightColor"),this.lightPosition=_(b(z),this.name+"_clouds_lightPosition"),this.lightIntensity=_(b($),this.name+"_clouds_lightIntensity"),this.density=_(b(l),this.name+"_clouds_density"),this.repartition=_(b(r),this.name+"_clouds_repartition"),this.layers=_(b(L),this.name+"_clouds_layers"),this.windSpeed=_(b(u),this.name+"_clouds_windSpeed"),this.wind={value:0},this.scales=_(b(h),this.name+"_clouds_scales"),this.noiseAmplitude=_(b(g),this.name+"_clouds_offsetAmplitude"),this.noiseFrequency=_(b(v),this.name+"_clouds_offsetFrequency"),this.count=0,this.offsetY=_(b(f),this.name+"_clouds_offsetY"),this.skyBoundaries=_(b(S),this.name+"_clouds_boundaries"),this.zNear=_(b(.1),this.name+"_clouds_zNear"),this.zFar=_(b(20),this.name+"_clouds_zFar"),this.depthTransition=_(b(V),this.name+"_clouds_depthTransition"),this.cloudDensity=_(b(1.1),this.name+"_clouds_density_shader"),this.cameraOffset={value:0},this.impostor=new ee(mt,new us({uniforms:{tClouds:e.cloudsTexture,tCloudsDepth:e.cloudsDepthTexture,tPlayer:e.playerTexture,tPlayerDepth:e.playerDepthTexture,tDepth:e.depthPrepass,res:i.drawingBufferSize,tAlpha:e.cloudsAlphaTexture},depthTest:!1,depthWrite:!1,transparent:!0,premultipliedAlpha:!0})),this.impostor.frustumCulled=!1,e.hooks.beforeReflectPass.watch(()=>this.impostor.visible=!1),e.hooks.afterReflectPass.watch(()=>this.impostor.visible=!0),this.base.add(this.impostor),this.offset=0,this.material=new os({atlas:n.spritesheets.clouds,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,defines:{...M==null?void 0:M.defines,...W},uniforms:{color:{value:new m(this.color.value)},lightColor:{value:new m(this.lightColor.value)},lightPosition:this.lightPosition,lightIntensity:this.lightIntensity,envMap:{value:e.envMap},reflectivity:{value:x},envMapIntensity:{value:T},tNoise:{value:n.textures.perlinNoise},boundaries:this.skyBoundaries,cameraOffset:this.cameraOffset,wind:this.wind,tDepth:e.depthPrepass,noiseAmplitude:this.noiseAmplitude,noiseFrequency:this.noiseFrequency,tPlayer:e.playerTexture,density:this.cloudDensity,res:{value:new y},zNear:this.zNear,zFar:this.zFar,depthTransition:this.depthTransition,...M==null?void 0:M.uniforms,...R}}),this.alphaMaterial=new ps({atlas:n.spritesheets.clouds,uniforms:{tNoise:{value:n.textures.perlinNoise},tDepth:e.depthPrepass,boundaries:this.skyBoundaries,cameraOffset:this.cameraOffset,wind:this.wind,noiseAmplitude:this.noiseAmplitude,noiseFrequency:this.noiseFrequency,res:i.drawingBufferSize,zNear:this.zNear,zFar:this.zFar,depthTransition:this.depthTransition,...R},defines:{...W}}),F&&(this.material.defines.USE_EMPTY_AREAS=!0,this.material.uniforms.tEmptyAreas={value:F.texture},this.material.uniforms.uEmptyAreasTransform={value:F.transform},this.alphaMaterial.defines.USE_EMPTY_AREAS=!0,this.alphaMaterial.uniforms.tEmptyAreas={value:F.texture},this.alphaMaterial.uniforms.uEmptyAreasTransform={value:F.transform}),this.generate()}generate(){this.clear();const{rng:e,$assets:n,$store:t,$renderer:i}=this.webgl,{x:o,y:a,z:l,w:r}=this.skyBoundaries.get(),u=this.density.value,h=this.repartition.value,g=l-o,v=r-a,f=[],w=this.layers.value;for(let x=0;x<w;x++){const T=v/w,$=x,L=$*T,V=qe($,0,w-1,u*.5,u),W=new Yt(g,T,V,h,e).calculate();W.forEach(ze=>ze.y+=L),f.push(...W)}this.count=f.length;const S=Object.values(n.spritesheets.clouds.sprites),M=[],F=[],Z=[];S.forEach(([x],T)=>{const $=x.geo.clone();$.center();const L=[],{position:V}=$.attributes;for(let R=0;R<V.count;R++)L.push(T);$.setAttribute("aType",new Ue(L,1)),M.push($)});const B=At(M);this.clouds=new Ne(B,this.material,this.count),this.clouds.layers.set(t.layers.CLOUDS),this.positions=Array(f.length).fill().map((x,T)=>new p(f[T].x+o,0,f[T].y+a)),this.positions.sort((x,T)=>x.z-T.z).forEach((x,T)=>{const $=1-Math.exp(-3*Ct(x.z,a,r)),L=qe($,0,1,.2,1),V=e.randomFloat(this.scales.value.x,this.scales.value.y)*L,R=e.randomInt(0,S.length-1),W=e.random();be.identity(),be.setPosition(x),be.scale(vs.setScalar(V)),Z.push(R),F.push(W),this.clouds.setMatrixAt(T,be)}),this.clouds.geometry.setAttribute("aSprite",new q(new Float32Array(Z),1)),this.clouds.geometry.setAttribute("aRand",new q(new Float32Array(F),1)),this.clouds.instanceMatrix.needsUpdate=!0,this.clouds.position.set(0,this.offsetY.value,0),this.clouds.matrixAutoUpdate=!1,this.clouds.manualMatrixUpdate=!0,this.clouds.frustumCulled=!1;let z=new y;this.clouds.onBeforeRender=x=>{const T=x.getRenderTarget();z.copy(i.drawingBufferSize.value),this.material.uniforms.res.value.set(T.width,T.height)},this.clouds.onAfterRender=x=>{this.material.uniforms.res.value.set(z.width,z.height)},this.scene.addObject3D(this.clouds),this.clouds.updateMatrix(),this.clouds.updateMatrixWorld(!0)}clear(){this.clouds&&(this.clouds.geometry.dispose(),this.clouds.removeFromParent())}update(){const{skipRenderEnvironment:e,isPaused:n}=this.webgl.$game;if(!this.clouds||n())return;const t=this.webgl.$time.dt*.001,i=this.parent.camera;this.clouds.position.x=i.base.position.x,this.clouds.updateMatrix(),this.clouds.updateMatrixWorld(!0),this.offset-=.008,this.cameraOffset.value=this.offset-i.base.position.x,this.wind.value+=t*this.windSpeed.value,this.base.visible=!e}dispose(){this.impostor.geometry.dispose(),this.impostor.material.dispose(),this.clouds.dispose(),this.clouds.geometry.dispose(),this.material.dispose(),this.alphaMaterial.dispose()}}const gs=`#define STANDARD
attribute vec4 uvAtlasOffset;
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <ascendfog_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#ifdef USE_LIGHTMAP
vLightMapUv.y = 1. - vLightMapUv.y;
#endif
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition = - mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#include <ascendfog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition = worldPosition.xyz;
#endif
}`,bs=P(gs,"vertexShader"),ys=`#define STANDARD
#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef USE_SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;
#ifdef USE_SPECULAR_COLORMAP
uniform sampler2D specularColorMap;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;
uniform float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;
#ifdef USE_SHEEN_COLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif
#ifdef USE_ANISOTROPY
uniform vec2 anisotropyVector;
#ifdef USE_ANISOTROPYMAP
uniform sampler2D anisotropyMap;
#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <ascendfog_pars_fragment>
void main() {
#include <clipping_planes_fragment>
vec4 diffuseColor = vec4( diffuse, opacity );
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
#include <transmission_fragment>
vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
#ifdef USE_SHEEN
float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
#endif
#ifdef USE_CLEARCOAT
float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
#endif
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <ascendfog_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,xs=P(ys,"fragmentShader");class ws extends zt{constructor({uniforms:n={},defines:t={},...i}={}){super(i);U(this,"name","TerrainMaterial");this.type="StandardMaterial",this.uniforms={...Dt.standard.uniforms,...ve.fog,...n},this.defines||(this.defines={}),Object.assign(this.defines,t),bs.use(this),xs.use(this)}}class Ei extends O{init(){this.base=new ie,this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.materials=[],this.createMaterial(),this.createEnvironment(),this.base.updateMatrix(),this.base.updateMatrixWorld(!0)}createMaterial(){const{$assets:e,$game:n}=this.webgl,{atlas:t,ascendFog:i,material:o={},lightmapScale:a}=this.props;this._lightMapIntensity=0,this.defaultMaterialParams={envMap:n.envMap,envMapIntensity:.3,...o,defines:{...i==null?void 0:i.defines},uniforms:{tNoise:{value:e.textures.perlinNoise},time:this.webgl.uniforms.time,...i==null?void 0:i.uniforms}}}createEnvironment(){const{scene:e,texturePrefix:n}=this.props,t=this.webgl.threeRenderer;this.texturesRef=Object.entries(this.webgl.$assets.textures).reduce((o,[a,l])=>{if(a.startsWith(n)){const[,r,u]=a.split("/");o[u]||(o[u]={}),t.initTexture(l),o[u][r]=l}return o},{}),this.materials=new Map;const i=[];e.traverse(o=>{if(o.isMesh){const a=o.geometry.clone();a.deleteAttribute("tangent");const l=o.material.name.toLowerCase();a.name=l;const{center:r}=o.geometry.boundingSphere;a.translate(-r.x,-r.y,-r.z);let u=null;if(this.materials.has(l))u=this.materials.get(l);else{const{albedo:h=null,normal:g=null,metallic:v=null,roughness:f=null,emissive:w=null}=this.texturesRef[l]??{};u={...this.defaultMaterialParams,map:h,normalMap:g,metalnessMap:v,roughnessMap:f,emissiveMap:w},this.materials.set(l,u)}i.push({position:r.clone(),geometry:a,materialParams:u})}}),i.sort((o,a)=>a.position.z-o.position.z),i.forEach(({geometry:o,materialParams:a,position:l})=>{let r=null;a.mat?r=a.mat:r=a.mat=new ws(a);const u=new ee(o,r);u.position.copy(l),u.renderToDepthPrepass=!0,u.matrixAutoUpdate=!1,u.manualMatrixUpdate=!0,u.updateMatrix(),this.webgl.hooks.beforePrerender.watch(()=>{u.updateMatrix(),u.updateMatrixWorld(!0)}),this.webgl.hooks.afterPrerender.watch(()=>{u.position.copy(l),u.updateMatrix(),u.updateMatrixWorld(!0)}),this.base.add(u)})}update(){const{skipRenderEnvironment:e}=this.webgl.$game;this.base.visible=!e}dispose(){Object.values(this.texturesRef).forEach(e=>Object.values(e).forEach(n=>n==null?void 0:n.dispose())),this.base.children.forEach(e=>{e.geometry.dispose(),e.material.dispose()})}get visible(){return this.base.visible}set visible(e){this.base.visible=e}}const _s=`#include <blending_pars_fragment>
#define saturate(v) clamp(v, 0.0, 1.0)
#include <luma>
#include <sd_segment>
varying vec3 vWorldPosition;
varying vec3 vSunDirection;
varying float vSunfade;
varying vec3 vBetaR;
varying vec3 vBetaM;
varying vec3 vPosition;
varying float vSunE;
uniform float mieDirectionalG;
uniform float progress;
uniform float exposure;
uniform vec3 up;
uniform vec2 res;
uniform vec3 uHorizonColor;
uniform vec3 uTopColor;
uniform vec2 uCloudsSize;
uniform sampler2D tNoise;
uniform sampler2D tWorley;
uniform sampler2D envMap;
uniform float time;
uniform float uShootingStarProgress;
uniform vec3 uGroundColor;
uniform vec3 ambientLightColor;
uniform vec2 uShootingStarPos;
uniform sampler2D uMap;
uniform vec2 uTexSize;
uniform float uYOffset;
uniform float uHorizonLayer;
uniform float uHorizonIntensity;
uniform sampler2D tRandom;
uniform float needsRotate;
#ifdef IS_NIGHT
uniform vec3 uFogDirection;
uniform vec3 uLightColor;
#endif
#ifdef USE_TOWN_FOG
uniform float townTime;
uniform float townRadius;
uniform vec3 townCenter;
uniform vec2 townCenterProjected;
#endif
#include <map>
#if NUM_POINT_LIGHTS > 0
struct PointLight {
vec3 color;
};
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
#endif
const vec3 cameraPos = vec3( 0.0, 1.0, 0.0 );
const float pi = 3.141592653589793238462643383279502884197169;
const float n = 1.0003;const float N = 2.545E25;
const float rayleighZenithLength = 8.4E3;
const float mieZenithLength = 1.25E3;
const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;
const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
const float ONE_OVER_FOURPI = 0.07957747154594767;
float rayleighPhase( float cosTheta ) {
return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
}
float hgPhase( float cosTheta, float g ) {
float g2 = pow( g, 2.0 );
float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
}
float exponentialIn(float t) {
  return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));
}
float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}
float exponentialInOut(float t) {
  return t == 0.0 || t == 1.0
    ? t
    : t < 0.5
      ? +0.5 * pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}
float exponentialOut(float t) {
  return t == 1.0 ? t : 1.0 - pow(2.0, -10.0 * t);
}
vec4 horizonColor(vec2 _uv) {
vec3 color = vec3(0);
float size = .1;
float hsize = size / 2.;
float px = 2. / res.y;
vec2 uv = _uv;
uv.y += uYOffset;
float top = 0.5 + hsize;
float bottom = 0.5 - hsize;
float alpha = smoothstep(top, top - px, uv.y) - smoothstep(bottom, bottom - px, uv.y);
uv.y -= 0.5 - hsize;
uv.y /= size;
uv.x *= 2.;
float gd = floor(uv.x);
uv.x = gd == 0. ? uv.x : 1. - uv.x;
uv.y -= uHorizonLayer;
uv.y /= HORIZON_MAX_SUBDIVISIONS;
uv.y = fract(uv.y);
vec2 noise = texture2D(tNoise, uv + vec2(progress * 500.)).rb * vec2(size, 1.);
vec4 img = texture2D(uMap, uv);
return vec4(img.rgb, alpha * img.a);
}
#ifdef IS_NIGHT
#ifndef SKIP_STARS
float hash12(vec2 p) {
return texture2D(tRandom, fract(p * .012)).r;
}
float Star(vec2 uv) {
float d = length(uv);
float m = .02/d * smoothstep(1., .0, d);
return m;
}
float ShootingStar(in vec2 p, in vec2 a, in float l, in float start, in float end) {
vec2 uv = p;
vec2 startPoint = mix(a, a - vec2(l, 0.006), start);
vec2 endPoint = mix(a, a - vec2(l, 0.006), end);
float segment = sdSegment((uv - 0.5) * vec2(pi * .5, 1.), startPoint, endPoint);
float m = smoothstep(0.0003, 0.0, segment);
return m;
}
vec3 Stars(vec2 _uv) {
vec3 col = vec3(0);
vec2 uv = _uv * 80.;
vec2 gv = fract(uv)-.5;
vec2 id = floor(uv);
float x;
float y;
float n;
float size;
float star;
float alpha = 0.;
vec2 offs;
#ifdef IS_LOW
col += pow(smoothstep(.8, .3, (texture2D(tWorley, _uv).r )), 5.) * .3;
col += pow(smoothstep(.6, .3, (texture2D(tWorley, _uv).r )), 6.) * 1.;
#else
#pragma unroll_loop_start
for (int i = 0; i < 9; i++) {
x = mod(float(UNROLLED_LOOP_INDEX), 3.) - 1.;
y = floor(float(UNROLLED_LOOP_INDEX) / 3.) - 1.;
offs = vec2(x, y);
n = hash12(id+offs);size = smoothstep(0.6, 1., fract(n*345.32)) * (fract(n*542.32) * .5 + .5) * 2.;
alpha = cos(time * 0.0001 * (fract(n*345.32) * .5 + .5) + n * 934.134) * .2 + .8;
alpha *= smoothstep(0.2, .6, _uv.y);
size *= alpha;
star = Star(gv-offs-vec2(n, fract(n*34.))+.5) * (sin(time * .0003 + n * 2155.) * .5 + 1.);
col += star * size * 2.8 * alpha;
}
#pragma unroll_loop_end
n = hash12(uv);
float mask = smoothstep(0., 1., texture2D(tNoise, _uv * .5).b) * 0.5 + 0.0;
col *= mask;
#endif
return col;
}
#endif
#endif
void main() {
vec3 direction = normalize( vWorldPosition - cameraPosition );
vec2 st = gl_FragCoord.xy / res.xy;
float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
float sR = rayleighZenithLength * inverse;
float sM = mieZenithLength * inverse;
vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );
float cosTheta = dot( direction, vSunDirection );
float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
vec3 betaRTheta = vBetaR * rPhase;
float mPhase = hgPhase( cosTheta, mieDirectionalG );
vec3 betaMTheta = vBetaM * mPhase;
vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );
float theta = acos( direction.y );float phi = atan( direction.z, direction.x );vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
uv.y = 1. - uv.y;
uv.x += time * 0.000001;
vec3 sunDir = normalize(vSunDirection);
vec2 sunUV = vec2( atan( sunDir.z, sunDir.x ), acos( sunDir.y ) ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
float sunFactor = saturate(1. - (length(uv - sunUV) / pi));
vec2 n = texture2D(tNoise, (uv + vec2(progress * 300., 0.)) * 4.3).rg;
vec3 c = vec3(ambientLightColor);
#ifndef IS_DAY
#ifndef IS_NIGHT
#if NUM_POINT_LIGHTS > 0
#pragma unroll_loop_start
for(int i=0; i<NUM_POINT_LIGHTS;i++)
{
c += pointLights[i].color;
}
#pragma unroll_loop_end
c /= float(NUM_POINT_LIGHTS + 1);
#endif
#endif
#endif
vec3 L0 = vec3( 0.1 ) * Fex;
float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
L0 += ( vSunE * 19000.0 * Fex ) * sundisk;
vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );
float horizonMask = exponentialIn(1. - (abs(uv.y - 0.49) * 4.));
float skyTopColor = (smoothstep(uHorizonIntensity, .7, uv.y));
float groundColor = smoothstep(0.5, 0.48, uv.y) - horizonMask;
vec3 outgoingLight = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );
outgoingLight = mix(vec3(0), outgoingLight, exposure);
#ifdef IS_NIGHT
cosTheta = smoothstep(1., -1., dot( direction, uFogDirection ));
float fogDensity = saturate(hgPhase( cosTheta, .8 ) * .8);
fogDensity *= exponentialIn(smoothstep(1., .45, uv.y));
float fadeHorizonStars = smoothstep(0.4, .8, uv.y - fogDensity * .2 );
horizonMask = exponentialIn(1. - saturate(abs(uv.y - 0.489) * 15.));
outgoingLight = mix(outgoingLight, mix(uTopColor, uTopColor+vec3(0.01), texture2D(tNoise, uv  ).r), skyTopColor);
#ifndef SKIP_STARS
vec2 _st = st + vec2(time * 0.000003, 0.);
float aspect = res.x / res.y;
_st.x *= aspect;
vec3 starsColor = Stars( uv*8.);
outgoingLight += mix(outgoingLight, starsColor.rgb, starsColor.r * fadeHorizonStars);
#endif
outgoingLight = mix(outgoingLight, uHorizonColor, horizonMask + fogDensity * 0.2 );
#ifndef SKIP_STARS
float start = exponentialInOut(uShootingStarProgress + 0.2);
float end = cubicInOut(uShootingStarProgress);
float shootingStarAlpha = smoothstep(0.1, 1., uShootingStarProgress) - smoothstep(0.5, 1., uShootingStarProgress);
outgoingLight += ShootingStar(uv, uShootingStarPos, 0.02, start, end) * shootingStarAlpha * (1. - fogDensity);
#endif
#else
float skyTopY = smoothstep(0.45, .5, uv.y);
vec4 envMapColor = texture2D(envMap, uv);
outgoingLight = mix(outgoingLight, uGroundColor, groundColor);
outgoingLight = mix(outgoingLight, uTopColor, skyTopColor);
outgoingLight = mix(outgoingLight, c, saturate((envMapColor.a) * .3) * skyTopY);
outgoingLight = mix(outgoingLight, uHorizonColor, horizonMask);
outgoingLight = mix(outgoingLight, c + .5, saturate(envMapColor.a - 1.2 + sunFactor * .2));
#endif
outgoingLight += texture2D(tRandom, uv * 1000.).rgb * .01;
outgoingLight = saturate(outgoingLight);
gl_FragColor = vec4( outgoingLight, 1.0 );
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,Ps=P(_s,"fragmentShader"),Ss=`uniform vec3 sunPosition;
uniform float rayleigh;
uniform float turbidity;
uniform float mieCoefficient;
uniform vec3 up;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying vec3 vSunDirection;
varying float vSunfade;
varying vec3 vBetaR;
varying vec3 vBetaM;
varying float vSunE;
#ifdef IS_NIGHT
uniform vec3 uFogPoint;
uniform vec3 uFogOffset;
varying vec3 vFogDirection;
varying vec3 vBetaRFog;
varying float vFogDensity;
varying float vFogE;
#endif
const float e = 2.71828182845904523536028747135266249775724709369995957;
const float pi = 3.141592653589793238462643383279502884197169;
const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );
const float v = 4.0;
const vec3 K = vec3( 0.686, 0.678, 0.666 );
const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );
const float cutoffAngle = 1.6110731556870734;
const float steepness = 1.5;
const float EE = 1000.0;
float sunIntensity( float zenithAngleCos ) {
zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
}
vec3 totalMie( float T ) {
float c = ( 0.2 * T ) * 10E-18;
return 0.434 * c * MieConst;
}
void main() {
vec4 center = modelMatrix * vec4(vec3(0), 1.0);
vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
vWorldPosition = worldPosition.xyz;
vPosition = position;
vNormal = normal;
vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
gl_Position = projectionMatrix * mvPosition;
gl_Position.z = gl_Position.w;vViewPosition = -mvPosition.xyz;
vSunDirection = normalize( sunPosition );
vSunE = sunIntensity( dot( vSunDirection, up ) );
vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );
float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );
vBetaR = totalRayleigh * rayleighCoefficient;
vBetaM = totalMie( turbidity ) * mieCoefficient;
#ifdef IS_NIGHT
#endif
}`,Ms=P(Ss,"vertexShader");class Ts extends H{constructor({uniforms:n={},defines:t={},...i}){super({side:$t,...i});U(this,"name","SkyMaterial");this.lights=!0,this.uniforms={...ut.clone(ve.lights),...n,res:c.$renderer.drawingBufferSize},this.defines||(this.defines={}),Object.assign(this.defines,t),Ps.use(this),Ms.use(this)}}const As=(s=128,e=128,n=!1)=>{const t=s*e,i=new Uint8Array(4*t);for(let a=0;a<t;a++){const l=a*4,r=Math.random(),u=n?Math.random():r,h=n?Math.random():r;i[l+0]=r*255,i[l+1]=u*255,i[l+2]=h*255,i[l+3]=255}const o=new Et(i,s,e);return o.wrapS=Me,o.wrapT=Me,o.magFilter=Ve,o.minFilter=Ve,o.generateMipmaps=!1,o.needsUpdate=!0,o},Xe=Math.PI/180;new y;const Cs=new m,me={DAWN:1,DAY:2,NIGHT:3},he={dawn:{layer:me.DAWN,horizonColor:16762010,skyTopColor:new m(3968730),horizonIntensity:.6,turbidity:.005,rayleigh:2.78,mieCoefficient:.34,mieDirectionalG:.79,exposure:1,elevation:8,azimuth:50},day:{layer:me.DAY,horizonColor:16777215,skyTopColor:new m(1662114),horizonIntensity:.4,turbidity:.005,rayleigh:.08,mieCoefficient:.0217,mieDirectionalG:.97,exposure:1,elevation:60,azimuth:40},night:{layer:me.NIGHT,horizonColor:2517405,skyTopColor:new m(526),horizonIntensity:.3,turbidity:30,rayleigh:2,mieCoefficient:.85,mieDirectionalG:.7,exposure:.35,elevation:0,azimuth:170}};class pe extends O{constructor(){super(...arguments);U(this,"isSky",!0)}init(){const{$assets:n,$renderer:t,$store:i}=this.webgl;n.textures.hdri&&(n.textures.hdri.colorSpace="",n.textures.hdri.minFilter=It,n.textures.hdri.wrapT=Me,n.textures.hdri.wrapS=Me);const{current:o="dawn",layer:a=pe.DAWN,lights:l,defines:r={},uniforms:u={},color:h=11576740}=this.props;this.uniforms={turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},exposure:{value:.5},sunPosition:{value:new p(-10,.5,-5)},up:{value:new p(0,1,0)},progress:{value:0},uHorizonIntensity:{value:he[o].horizonIntensity},uGroundColor:{value:new m(h)},uHorizonColor:{value:new m(he[o].horizonColor)},uTopColor:{value:he[o].skyTopColor.clone()},tNoise:{value:n.textures.perlinNoise},res:t.drawingBufferSize,tRandom:{value:As(128,128)},tWorley:{value:n.textures.worleyNoise},uYOffset:{value:-.015},envMap:{value:n.textures.hdri},time:{value:Math.random()*1e3},uShootingStarPos:{value:new y(0,0)},uShootingStarProgress:{value:0},needsRotate:{value:0},...u},a===pe.NIGHT&&Object.assign(r,{IS_NIGHT:""}),a===pe.DAY&&Object.assign(r,{IS_DAY:""}),oe.$device.type.mobile&&Object.assign(r,{IS_LOW:""}),this.material=new Ts({uniforms:this.uniforms,defines:{HORIZON_MAX_SUBDIVISIONS:Object.keys(me).length.toFixed(1),...r}}),this.base=new ee(new kt,this.material),this.base.scale.setScalar(1200),this.base.renderOrder=1e3,this.base.layers.enable(i.layers.ENVMAP),this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.base.frustumCulled=!1,this.sunPosition=new p(0,10,0),l&&(this.lights=l);const{elevation:g,azimuth:v}=he[o];this.azimuth=b(g),this.elevation=b(v),this.current=o,this.updateCycle(!0),this.computeSunPosition(),this.updateCycle(!0),this.webgl.$game.hooks.skyHasChanged.emit()}update(){const{skipRenderEnvironment:n}=this.webgl.$game;if(this.webgl.$game.isPaused())return;const t=this.scene.getCurrentCamera().base,i=this.webgl.$time.dt*1e-8;this.uniforms.sunPosition.value.copy(this.sunPosition),this.uniforms.time.value+=this.webgl.$time.dt,this.uniforms.progress.value+=i*this.scene.timeScale.value,this.uniforms.uShootingStarProgress.value+=this.webgl.$time.dt*.0025,this.uniforms.uShootingStarProgress.value>1&&(this.uniforms.uShootingStarProgress.value=1),this.base.position.copy(t.position),this.base.updateMatrix(),this.base.updateMatrixWorld(!0),this.base.visible=!n}computeSunPosition(){const n=(95-this.elevation.value)*Xe,t=(-this.azimuth.value+180)*Xe;this.sunPosition.setFromSphericalCoords(1,n,t),this.lights&&(this.lights.sunPosition.value.x=this.sunPosition.x*1200,this.lights.sunPosition.value.y=this.sunPosition.y*1200,this.lights.sunPosition.value.z=this.sunPosition.z*1200)}updateCycle(n=!1){const{turbidity:t,rayleigh:i,mieCoefficient:o,mieDirectionalG:a,exposure:l,elevation:r,azimuth:u,horizonColor:h,skyTopColor:g,horizonIntensity:v}=he[this.current],f=n?1:.02,w=n?1:.1,S=n?1:.3;this.uniforms.turbidity.value=d(this.uniforms.turbidity.value,t,f),this.uniforms.rayleigh.value=d(this.uniforms.rayleigh.value,i,S),this.uniforms.mieCoefficient.value=d(this.uniforms.mieCoefficient.value,o,f),this.uniforms.mieDirectionalG.value=d(this.uniforms.mieDirectionalG.value,a,f),this.uniforms.exposure.value=d(this.uniforms.exposure.value,l,f),this.uniforms.uHorizonColor.value.lerp(Cs.set(h),f),this.uniforms.uTopColor.value.lerp(g,f),this.uniforms.uHorizonIntensity.value=d(this.uniforms.uHorizonIntensity.value,v,f),this.elevation.value=d(this.elevation.value,r,f),this.azimuth.value=d(this.azimuth.value,u,w)}triggerShootingStar(){if(this.uniforms.uShootingStarProgress.value>0&&this.uniforms.uShootingStarProgress.value<1)return;const{rng:n}=this.webgl.$game;this.uniforms.uShootingStarPos.value.set(n.randomFloat(-.3,-.5),n.randomFloat(.05,.12)),this.uniforms.uShootingStarProgress.value=0}dispose(){this.base.geometry.dispose(),this.base.material.dispose()}}Object.assign(pe,me);class te{constructor(e={}){this.isMixin=!0,this.isCreated=!1,this.isDestroyed=!1,this.options=e,this.base=null,this.webgl=Ht()}created(){}used(){}unused(){}destroyed(){}update(){}componentAttached(){}componentDetached(){}use(e){if(this.isDestroyed||this.base===e)return;this.base=e;const n=e.usedMixins;this.uid&&e.uid!==this.uid||(this.uid=e.uid,this.isCreated||(this.static=this.static!=null?this.static:!this.update,this.isCreated=!0,this.created(e,this.options)),n.push(this),this.static||n.dynamic.push(this),this.used(e))}unuse(){if(this.isDestroyed||!this.base)return;this.unused(this.base);let e;e=this.base.usedMixins.indexOf(this),e>=0&&this.base.usedMixins.splice(e,1),e=this.base.usedMixins.dynamic.indexOf(this),e>=0&&this.base.usedMixins.dynamic.splice(e,1),this.base=null}destroy(){if(this.isDestroyed)return;const e=this.base;this.unuse(),this.base=e,this.destroyed(),this.base=null,this.isDestroyed=!0,this.options=null,this.webgl=null}extendsProto(e,n,t){const i=this.base.constructor.prototype;!t&&i[e]||(i[e]=n)}}const zs=Ft();class Ds extends te{created(){this.base.shakeState={shaking:!1,maxDuration:0,maxAmplitude:0,currentDuration:0,currentAmplitude:0,freqMult:1,value:[0,0],pos:[0,0],speed:[.006,1e-4]},this.base.shake=Es.bind(this.base),this.base.updateShake=$s.bind(this.base)}}function $s(){const s=this.shakeState;if(!s.shaking)return;const e=this.webgl.time.dt,n=1-s.currentDuration/s.maxDuration;let t=d(s.speed[0],s.speed[1],n);t*=s.freqMult,s.currentAmplitude=d(s.maxAmplitude,0,n),s.pos[0]+=e*t,s.pos[1]+=e*t,s.value[0]=Math.cos(s.pos[0]*9)*s.currentAmplitude*.6,s.value[1]=zs(10,s.pos[1])*s.currentAmplitude;const i=s.value[0]*.9,o=s.value[1]*.3,a=s.vertical?o:i,l=s.vertical?i:o;this.base.translateY(l),this.base.translateX(a),this.base.rotateZ(l*.5),this.base.rotateY(a*.5),s.currentDuration=Math.max(0,s.currentDuration-e),s.currentDuration===0&&(s.maxAmplitude=0,s.maxDuration=0,s.shaking=!1)}async function Es(s=500,e=.1,n=!1,t=!1,i=1,o=0){await Te(o);const a=this.shakeState;e*=1.07,a.vertical=n,(t||!a.shaking||s>a.maxDuration)&&(a.maxDuration=s,a.currentDuration=s),(t||!a.shaking||e>a.maxAmplitude)&&(a.maxAmplitude=e,a.currentAmplitude=e,a.freqMult=i),(s||e)&&(a.shaking=!0),a.pos[0]=Math.PI*200,a.pos[1]=Math.random()*500}const G={from:{position:[],quaternion:[],fov:39},fromDesktop:{position:[-4.56461,4+4,12.14232],quaternion:[0,0,0,1],fov:39},fromMobile:{position:[-5.56461,4+4,16.14232],quaternion:[0,0,0,1],fov:39},to:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},toMobile:{position:[.30213,.83013+4,45.46619],quaternion:[0,0,0,1],fov:39},toDesktop:{position:[.30213,.83013+4,45.46619],quaternion:[0,0,0,1],fov:39}};for(let s in G){const e=G[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}const D={from:{position:new p,quaternion:new C,fov:39},to:{position:new p,quaternion:new C,fov:39}},De=[{from:{position:[15.35017,-1.38923,15.50924],quaternion:[.401518,.370107,-.181714,.817792],fov:39},to:{position:[-.09289,7.48634,29.7587],quaternion:[.230884,-.011038,.002619,.972915],fov:39}},{from:{position:[7.82972,1.79761+3.3,16.7333],quaternion:[-.013415,.277288,.003872,.960686],fov:39},to:{position:[8.68268,4.38492+3.3,11.36295],quaternion:[.007806,.446962,-.003901,.894511],fov:39}},{from:{position:[-4.56461,4+4,12.14232],quaternion:[0,0,0,1],fov:39},to:{position:[.30213,.83013+4,45.46619],quaternion:[0,0,0,1],fov:39}}];class Is extends te{created(){const e=this.base,n=e.registerState("end",{needsUpdate:!1,onEnter:ks,onUpdate:Us,onUpdateAbsolute:Ls,leave:Ns,reset:qs,lastLevelAnim:Ye}),t=G;e.lastLevelAnim=Ye.bind(e),c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.from.fov=N(t.fromMobile.fov,t.fromDesktop.fov,i),t.from.position.lerpVectors(t.fromMobile.position,t.fromDesktop.position,i),t.from.quaternion.slerpQuaternions(t.fromMobile.quaternion,t.fromDesktop.quaternion,i),t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i)})}}async function ks(){const s=this.states.end;s.reset(),s.camTween&&(s.camTween=s.camTween.destroy()),s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.mouseInfluence=0,s.dollyProgress=0,s.mouseX=0,s.mouseY=0,s.ang=0,c.scene.name==="starry_night"?this.lastLevelAnim():s.camTween=A({target:s,property:"dollyProgress",easing:"inOutSine",from:0,to:1,duration:6e3})}async function Ye(){var t,i,o;this.last=!1;const s=this.states.end;let e=De[0];D.from.position.set(e.from.position[0],e.from.position[1],e.from.position[2]),D.to.position.set(e.to.position[0],e.to.position[1],e.to.position[2]),D.from.quaternion.set(e.from.quaternion[0],e.from.quaternion[1],e.from.quaternion[2],e.from.quaternion[3]),D.to.quaternion.set(e.to.quaternion[0],e.to.quaternion[1],e.to.quaternion[2],e.to.quaternion[3]);let n=null;(t=s.camTween)==null||t.destroy(),s.camTween=null,s.camTween=A({target:s,property:"dollyProgress",easing:"linear",from:0,to:1,duration:4e3}),n=I.randomInt(0,1e6),s.camTween.id=n,await Te(3e3),n===s.camTween.id&&((i=s.camTween)==null||i.destroy(),s.camTween=null,e=De[1],D.from.position.set(e.from.position[0],e.from.position[1],e.from.position[2]),D.to.position.set(e.to.position[0],e.to.position[1],e.to.position[2]),D.from.quaternion.set(e.from.quaternion[0],e.from.quaternion[1],e.from.quaternion[2],e.from.quaternion[3]),D.to.quaternion.set(e.to.quaternion[0],e.to.quaternion[1],e.to.quaternion[2],e.to.quaternion[3]),s.camTween=A({target:s,property:"dollyProgress",easing:"linear",from:0,to:1,duration:3e3}),n=I.randomInt(0,1e6),s.camTween.id=n,await Te(2e3),n===s.camTween.id&&s.camTween&&((o=s.camTween)==null||o.destroy(),s.camTween=null,e=De[2],D.from.position.set(e.from.position[0],e.from.position[1],e.from.position[2]),D.to.position.set(e.to.position[0],e.to.position[1],e.to.position[2]),D.from.quaternion.set(e.from.quaternion[0],e.from.quaternion[1],e.from.quaternion[2],e.from.quaternion[3]),D.to.quaternion.set(e.to.quaternion[0],e.to.quaternion[1],e.to.quaternion[2],e.to.quaternion[3]),this.last=!0,s.camTween=A({target:s,property:"dollyProgress",easing:"inOutSine",from:0,to:1,duration:5e3})))}const Fs=new C;function Us(){const s=this.states.end,e=c.$time.stableDt,n=c.$app.$controls.touch;if(c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:.2,.1,e,.001),s.needsUpdate=!1,!s.isUsed))return;s.camTween&&s.camTween.update(e),s.endTween&&s.endTween.update(e),this.base.fov=39;const t=p.get();this.webgl.scene.name==="starry_night"?this.last?(this.base.position.lerpVectors(G.from.position,G.to.position,s.dollyProgress),this.base.lookAt(t.set(ne(c.$store.desktopInfluence.value*1.3,0,s.dollyProgress*1.2),ne(7,9,s.dollyProgress),d(4,0,s.dollyProgress)))):(this.base.position.lerpVectors(D.from.position,D.to.position,s.dollyProgress),this.base.quaternion.slerpQuaternions(D.from.quaternion,D.to.quaternion,s.dollyProgress)):(this.base.position.lerpVectors(G.from.position,G.to.position,s.dollyProgress),Fs.slerpQuaternions(G.from.quaternion,G.to.quaternion,s.dollyProgress),this.base.lookAt(t.set(ne(c.$store.desktopInfluence.value*1.3,0,s.dollyProgress*1.2),ne(7,9,s.dollyProgress),d(4,0,s.dollyProgress)))),t.release()}function qs(){const s=this.states.end;s.camTween&&(s.camTween=s.camTween.destroy()),s.dollyProgress=0}function Ns(){const s=this.states.end;s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.endTween=A({target:s,property:"endProgress",easing:"inExpo",from:0,to:1,duration:600})}function Ls(){const s=this.states.end,e=c.$time.elapsed,n=c.$time.stableDt,t=c.$app.$controls.touch;if(s.isUsed&&s.mouseInfluence>0){const i=s.mouseInfluence*s.dollyProgress,o=t.normalizePos.x*i,a=t.normalizePos.y*i*2,l=s.mouseX;let r=s.mouseX=k(s.mouseX,o,.1,n);s.mouseY=k(s.mouseY,a,.1,n);const u=3,h=.25*i;r+=Math.sin(e*4e-4*u)*.2*h,s.ang=k(s.ang,(r-l)*.5,.2,n)}}const X={from:{position:[],quaternion:[],fov:39},fromDesktop:{position:[0,7.5,40],quaternion:[0,0,0,1],fov:39},fromMobile:{position:[0,7.5,40],quaternion:[0,0,0,1],fov:39},to:{position:[0,8,40],quaternion:[0,0,0,1],fov:39},toMobile:{position:[4.71122,26.40077,20.08805],quaternion:[.350185,-.010626,.003973,.936612],fov:39},toDesktop:{position:[4.71122,26.40077,20.08805],quaternion:[.350185,-.010626,.003973,.936612],fov:39},toEnd:{position:[],quaternion:[],fov:39}};for(let s in X){const e=X[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}class Os extends te{created(){const n=this.base.registerState("endGame",{needsUpdate:!1,onEnter:Rs,onUpdate:Bs,onUpdateAbsolute:Ws,leave:Vs}),t=X;c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.from.fov=N(t.fromMobile.fov,t.fromDesktop.fov,i),t.from.position.lerpVectors(t.fromMobile.position,t.fromDesktop.position,i),t.from.quaternion.slerpQuaternions(t.fromMobile.quaternion,t.fromDesktop.quaternion,i),t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i)})}}async function Rs(){const{$app:s}=c,e=this.states.endGame;s.$store.isLookingUp=!1,e.camTween&&(e.camTween=e.camTween.destroy()),e.endTween&&(e.endTween=e.endTween.destroy()),this.pos=new p,this.pos.copy(this.base.position),e.endProgress=0,e.mouseInfluence=0,e.dollyProgress=0,e.mouseX=0,e.mouseY=0,e.ang=0,e.camTween=A({target:e,property:"dollyProgress",easing:"inOutSine",from:0,to:1,duration:3e3}),await Te(5e3),this.pos.copy(X.from.position),this.pos.x=c.scene.camera.base.position.x,e.needsMouse=!0,e.camTween=A({target:e,property:"dollyProgress",easing:"inOutSine",from:1,to:0,duration:6e3})}const He=new C;function Bs(){const s=this.states.endGame,e=c.$time.stableDt,n=c.$app.$controls.touch;if(!s.isUsed||c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:.2,.1,e,.001),s.needsUpdate=!1,!s.isUsed))return;s.camTween&&s.camTween.update(e),s.endTween&&s.endTween.update(e),this.base.fov=39,X.to.position.x=this.pos.x,this.base.position.lerpVectors(this.pos,X.to.position,s.dollyProgress);const t=this.webgl.$game;d(t.cameraBounds.x[0],t.cameraBounds.x[1],1-this.webgl.$store.desktopInfluence.value),He.slerpQuaternions(X.from.quaternion,X.to.quaternion,s.dollyProgress),this.base.quaternion.slerpQuaternions(He,X.toEnd.quaternion,s.endProgress)}function Vs(){const{$app:s}=c,e=this.states.endGame;e.endTween&&(e.endTween=e.endTween.destroy()),s.$store.isLookingUp=!1,e.endProgress=0,e.endTween=A({target:e,property:"endProgress",easing:"inExpo",from:0,to:1,duration:600})}function Ws(){const s=this.states.endGame,e=c.$time.elapsed,n=c.$time.stableDt,t=c.$app.$controls.touch;if(s.isUsed&&!t.useTouch&&s.mouseInfluence>0&&s.needsMouse){const i=s.mouseInfluence*(1-s.dollyProgress),o=(this.mousePos.normalizedX-.5)*i,a=this.mousePos.normalizedY*i*2;s.mouseX;let l=s.mouseX=k(s.mouseX,o,.05,n),r=s.mouseY=k(s.mouseY,a,.05,n);s.prevMousX===void 0&&(s.prevMousX=l);const u=3,h=.25*i;l+=Math.sin(e*4e-4*u)*.2*h,r+=Math.cos(e*4e-4*u)*.3*h,s.ang=k(s.ang,(s.prevMousX-s.mouseX)*.5,.1,n),this.base.rotateY(-l/6),this.base.rotateX(-r/13),this.base.rotateZ(s.ang*5),s.prevMousX=s.mouseX}}const Gs=2.3,Ze=new y(200,200),je=Math.random()*3543;let $e=0;const Xs=new y,Ys=new y,Hs=new p,Zs=new p,re=I.randomFloat,js=ge("linear"),Qs=I.tossCoin,ye={"Sea of Clouds":{base:new m(13672078).convertLinearToSRGB()},"Frozen Lake":{base:new m(16777215).convertLinearToSRGB()},"Starry Night":{base:new m(1121865).convertLinearToSRGB()}},ce={from:{position:[0,0,15],quaternion:[0,0,0,1],fov:39.55},to:{position:[0,0,15],quaternion:[0,0,0,1],fov:39.55},toMobile:{position:[0,0,15],quaternion:[0,0,0,1],fov:39.55},toDesktop:{position:[0,0,15],quaternion:[0,0,0,1],fov:39.55}};for(let s in ce){const e=ce[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}const Ks=ge(.51,.8,.53,.99);ge(Ae.outSwift);class Js extends te{created(){const n=this.base.registerState("game",{needsUpdate:!1,onEnter:en,onUpdate:nn,onUpdateAbsolute:on,reset:sn,forcePos:tn}),t=ce;c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i)})}}function en(){const s=this.states.game;this.temp=new p,s.camTween&&(s.camTween=s.camTween.destroy()),this.offset=0,this.ySpring=We({tension:.01,friction:.2,initial:1}),this.springTest=We({tension:.01,friction:.2,initial:1}),s.mouseInfluence=0,s.dollyProgress=0,s.mouseX=0,s.mouseY=0,s.ang=0,s.position=new p().copy(ce.to.position),c.$app.$store.isLookingUp=!1,this._shakeAmount=0,this._shakeFreq=1,this._shakeAmpl=1,s.camTween=A({target:s,property:"dollyProgress",easing:"outSine",from:0,to:1,duration:4e3}),this.smoothCamVel=0,this.dist=0;const e=this.webgl.$store;e.camera.game.zoomOut=0,e.camera.game.lerpZoom=0,e.camera.game.lerp=.04,e.camera.game.shakeAmount=this._shakeAmount,e.camera.game.shakeFreq=this._shakeFreq,e.camera.game.shakeAmpl=this._shakeAmpl,this.basePos=new p,this.basePos.copy(this.base.position),this.position=s.position}function tn(s=0){s&&(this.offset=s)}function sn(s){this.offset=c.$store.game.basePos.x,this.quaternion=new C().copy(this.base.quaternion),this.forceReset=s}function nn(){if(c.$game.isPaused())return;const s=this.states.game,e=c.$time.stableDt,n=c.$app.$controls.touch,{width:t,height:i}=this.webgl.$viewport.size.get();if(!s.isUsed&&!s.needsUpdate||c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:1,.1,e,.001),s.needsUpdate=!1,!s.isUsed))return;s.camTween&&s.camTween.update(e),this.base.fov=39;const o=c.$store.game,a=this.webgl.$game,l=s.dollyProgress;this.springTest.update(e),this.endProgress=0,this.endProgress=Se(this.endProgress,0,1),this.endProgressEased=Ks(this.endProgress),this.position.y=ne(this.ySpring.value,5,this.endProgressEased);const r=this.webgl.$game.currentChapter;if(!r)return;const h=r.zeppelin.base,g=.2*this.webgl.$time.stableDt/16,v=.03*this.webgl.$time.stableDt/16;let w=2*Math.tan(Ut(this.base.fov)/2)*this.base.position.z*this.base.aspect;const S=o.tutoProgress,M=Math.min(w/2-.7,d(c.$store.safeZoneSize-1,c.$store.safeZoneSize,c.$store.desktopInfluence.value));this.webgl.$store.game.camera.camWidth=w,this.webgl.$store.game.safeZoneSize=M;const F=this.offset-h.position.x+M>0?v:this.webgl.$store.velocity.x,Z=fe(this.position.x,this.webgl.$game.currentLevel.end+2-o.camera.camWidth*.8,this.webgl.$game.currentLevel.end+2-o.camera.camWidth*.4,0,1);this.webgl.$store.deathProgress=js(fe(h.position.x,this.position.x-w/2-2,this.position.x-w/2+M*.5,1,0)*this.webgl.$game.currentLevel.mayFirstTouch);let B=d(d(this.webgl.$store.velocity.x,this.webgl.$store.velocity.x+d(.015+(c.$game.isStormy?.01:0),.02+(c.$game.isStormy?.02:0),c.$store.desktopInfluence.value)*this.webgl.$time.stableDt/16,Se(a.slowdownFactor*5,0,1)),F,!this.webgl.$game.isSlowingDown),z=Se(B,v,Math.max(g,B));z=d(z,d(z*.03,z*.1,c.$store.desktopInfluence.value),Z),this.springTest.setTarget(z),this.smoothCamVel=d(this.smoothCamVel,z,.1),this.webgl.$store.cameraVelocity=d(this.webgl.$store.cameraVelocity,this.smoothCamVel,.1);const x=this.webgl.$store.camera.game,T=ne(d(this.webgl.$game.tutoCameraBounds.y[0],this.webgl.$game.cameraBounds.y[0],1-S),d(this.webgl.$game.tutoCameraBounds.y[1],this.webgl.$game.cameraBounds.y[1],1-S),Math.max(x.lerpZoom,1-c.$store.desktopInfluence.value)),$=d(o.tuto.limits.min,o.main.limits.min,1-S),L=d(o.tuto.limits.max,o.main.limits.max,1-S);let V=d($+T,L-T,fe(h.position.y,$,L,0,1));if(x.lerpZoom=ne(x.lerpZoom,x.zoomOut,x.lerp),this.offset+=this.webgl.$store.cameraVelocity,this.ySpring.setTarget(V),this.ySpring.update(e),this._shakeAmount=k(this._shakeAmount,x.shakeAmount,.1,e),this._shakeFreq=k(this._shakeFreq,x.shakeFreq,.1,e),this._shakeAmpl=k(this._shakeAmpl,x.shakeAmpl,.1,e),Qs(.1)&&c.$quality.current.value>=4){const ue=re(.005,.01)/5;c.$particles.emit("windBlur",{amount:1,position:Hs.set(this.position.x+re(30,50),re($,L),re(-10,10)),scale:Xs.set(ue,ue/10),duration:3,alpha:re(.5,.8),depthTest:!0,sprite:"wind",batcher:"wind",velX:re(100,120),color:ye[this.webgl.$app.$route.name]?ye[this.webgl.$app.$route.name].base:new m(13672078)})}if(I.randomFloat(0,1)<.05&&!c.$game.isStormy&&c.$quality.current.value>=3){const ue=I.randomFloat(.05,.07)/4;c.$particles.emit("windBlur",{amount:1,position:Zs.set(this.position.x+I.randomFloat(50,70),I.randomFloat(-1,3.7),I.randomFloat(3.5,4.5)),scale:Ys.set(ue,ue/I.randomFloat(.9,1.3)),duration:10,alpha:I.randomFloat(this.webgl.$app.$route.name==="Starry Night"?.5:.9,this.webgl.$app.$route.name==="Starry Night"?.8:1),depthTest:!0,velX:I.randomFloat((this.webgl.$app.$route.name==="Frozen Lake",70),this.webgl.$app.$route.name==="Frozen Lake"?100:90),sprite:"wind",batcher:"wind",color:ye[this.webgl.$app.$route.name]?ye[this.webgl.$app.$route.name].base:new m(13672078)})}const R=Math.pow(this._shakeAmount,Gs),W=Ze.x*R*a.noise(je*2,$e)*this._shakeAmpl,ze=Ze.y*R*a.noise(je*3,$e*.5)*this._shakeAmpl;this.isOffseting||this.base.setViewOffset(t,i,W,ze,t,i),$e+=.001*e;const vt=d(a.cameraBounds.x[0],a.cameraBounds.x[1],1-c.$store.desktopInfluence.value),gt=d(vt,a.cameraBounds.x[1],x.lerpZoom),bt=d(a.tutoCameraBounds.x[0],a.tutoCameraBounds.x[1],1-c.$store.desktopInfluence.value);this.position.x=d(gt,bt,S),o.camera.baseOffset=this.offset,this.position.x+=this.offset;const yt=d(o.camera.main.limits.min,o.camera.main.limits.max,1-c.$store.desktopInfluence.value),xt=d(yt,o.camera.main.limits.max,x.lerpZoom),wt=d(o.camera.tuto.limits.min,o.camera.tuto.limits.max,1-c.$store.desktopInfluence.value);this.position.z=d(xt,wt,S),this.forceReset&&(this.basePos.copy(this.position),this.base.quaternion.copy(ce.to.quaternion),this.forceReset=!1),this.base.quaternion.slerpQuaternions(this.quaternion,ce.to.quaternion,l),this.temp.lerpVectors(this.basePos,this.position,l),this.base.position.copy(this.temp);const _t=Math.PI/180*this.base.fov,Pt=10/this.base.aspect/2/Math.tan(_t/2);this.base.position.z=d(this.base.position.z,Pt,this.endProgressEased)}function on(){}const j={from:{position:[],quaternion:[],fov:39},fromDesktop:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},fromMobile:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},to:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},toMobile:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},toDesktop:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},toEnd:{position:[],quaternion:[],fov:39},toEndMobile:{position:[0,0,20],quaternion:[0,0,0,1],fov:37.85},toEndDesktop:{position:[0,0,20],quaternion:[0,0,0,1],fov:37.85}};for(let s in j){const e=j[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}class an extends te{created(){const n=this.base.registerState("home",{needsUpdate:!1,onEnter:rn,onUpdate:ln,onUpdateAbsolute:un,leave:cn}),t=j;c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.from.fov=N(t.fromMobile.fov,t.fromDesktop.fov,i),t.from.position.lerpVectors(t.fromMobile.position,t.fromDesktop.position,i),t.from.quaternion.slerpQuaternions(t.fromMobile.quaternion,t.fromDesktop.quaternion,i),t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i),t.toEnd.position.lerpVectors(t.toEndMobile.position,t.toEndDesktop.position,i),t.toEnd.quaternion.slerpQuaternions(t.toEndMobile.quaternion,t.toEndDesktop.quaternion,i)})}}function rn(){const s=this.states.home;c.$app.$store.isLookingUp=!1,s.camTween&&(s.camTween=s.camTween.destroy()),s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.mouseInfluence=0,s.dollyProgress=0,s.mouseX=0,s.mouseY=0,s.ang=0,s.camTween=A({target:s,property:"dollyProgress",easing:"outQuart",from:0,to:1,duration:3e3})}const Qe=new C;function ln(){const s=this.states.home,e=c.$time.stableDt,n=c.$app.$controls.touch;if(s.isUsed&&s.mouseInfluence<=0&&s.dollyProgress>=1&&!s.needsUpdate||c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:.2,.1,e,.001),s.needsUpdate=!1,!s.isUsed))return;s.camTween&&s.camTween.update(e),s.endTween&&s.endTween.update(e),this.base.fov=39,this.base.position.lerpVectors(j.from.position,j.to.position,s.dollyProgress);const t=c.$game,i=d(t.cameraBounds.x[0],t.cameraBounds.x[1],1-c.$store.desktopInfluence.value);c.scene.prerendered&&(c.scene.camera.base.position.x=c.$store.game.basePos.x+i+4),Qe.slerpQuaternions(j.from.quaternion,j.to.quaternion,s.dollyProgress),this.base.quaternion.slerpQuaternions(Qe,j.toEnd.quaternion,s.endProgress)}function cn(){const s=this.states.home;s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.endTween=A({target:s,property:"endProgress",easing:"inExpo",from:0,to:1,duration:600})}function un(){const s=this.states.home,e=c.$time.elapsed,n=c.$time.stableDt,t=c.$app.$controls.touch;if(s.isUsed&&!t.useTouch&&s.mouseInfluence>0){const i=s.mouseInfluence*s.dollyProgress,o=this.mousePos.normalizedX*i,a=this.mousePos.normalizedY*i*2,l=s.mouseX;let r=s.mouseX=k(s.mouseX,o,.1,n),u=s.mouseY=k(s.mouseY,a,.1,n);const h=3,g=.25*i;r+=Math.sin(e*4e-4*h)*.2*g,u+=Math.cos(e*4e-4*h)*.3*g,s.ang=k(s.ang,(r-l)*.5,.2,n),this.base.position.x-=r,this.base.position.y-=u,this.base.rotation.y+=r*.1,this.base.position.z+=-r,this.base.rotateY(-r/3),this.base.rotateZ(s.ang)}}const Q={from:{position:[],quaternion:[],fov:39},fromDesktop:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},fromMobile:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},to:{position:[0,0,20],quaternion:[0,0,0,1],fov:39},toMobile:{position:[0,5,20],quaternion:[.160094,-.088596,.014429,.983012],fov:39},toDesktop:{position:[0,5,20],quaternion:[.160094,-.088596,.014429,.983012],fov:39},toEnd:{position:[],quaternion:[],fov:39},toEndMobile:{position:[0,0,20],quaternion:[0,0,0,1],fov:37.85},toEndDesktop:{position:[0,0,20],quaternion:[0,0,0,1],fov:37.85}};for(let s in Q){const e=Q[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}class hn extends te{created(){const n=this.base.registerState("lose",{needsUpdate:!1,onEnter:fn,onUpdate:dn,onUpdateAbsolute:pn,leave:mn}),t=Q;c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.from.fov=N(t.fromMobile.fov,t.fromDesktop.fov,i),t.from.position.lerpVectors(t.fromMobile.position,t.fromDesktop.position,i),t.from.quaternion.slerpQuaternions(t.fromMobile.quaternion,t.fromDesktop.quaternion,i),t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i),t.toEnd.position.lerpVectors(t.toEndMobile.position,t.toEndDesktop.position,i),t.toEnd.quaternion.slerpQuaternions(t.toEndMobile.quaternion,t.toEndDesktop.quaternion,i)})}}function fn(){const{$app:s}=c,e=this.states.lose;s.$store.isLookingUp=!0,e.camTween&&(e.camTween=e.camTween.destroy()),e.endTween&&(e.endTween=e.endTween.destroy()),e.endProgress=0,e.mouseInfluence=0,e.dollyProgress=0,e.mouseX=0,e.mouseY=0,e.ang=0,e.camTween=A({target:e,property:"dollyProgress",easing:"outQuart",from:0,to:1,duration:3e3})}const Ke=new C;function dn(){const s=this.states.lose,e=c.$time.stableDt,n=c.$app.$controls.touch;if(s.isUsed&&s.mouseInfluence<=0&&s.dollyProgress>=1&&!s.needsUpdate||c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:.2,.1,e,.001),s.needsUpdate=!1,!s.isUsed))return;s.camTween&&s.camTween.update(e),s.endTween&&s.endTween.update(e),this.base.fov=39,this.base.position.lerpVectors(Q.from.position,Q.to.position,s.dollyProgress);const t=this.webgl.$game,i=d(t.cameraBounds.x[0],t.cameraBounds.x[1],1-this.webgl.$store.desktopInfluence.value);this.base.position.x=this.webgl.$store.game.basePos.x+i,Ke.slerpQuaternions(Q.from.quaternion,Q.to.quaternion,s.dollyProgress),this.base.quaternion.slerpQuaternions(Ke,Q.toEnd.quaternion,s.endProgress)}function mn(){const{$app:s}=c,e=this.states.lose;e.endTween&&(e.endTween=e.endTween.destroy()),s.$store.isLookingUp=!1,e.endProgress=0,e.endTween=A({target:e,property:"endProgress",easing:"inExpo",from:0,to:1,duration:600})}function pn(){}const K={from:{position:[],quaternion:[],fov:39},fromDesktop:{position:[0,5,15],quaternion:[0,0,0,1],fov:39},fromMobile:{position:[0,5,15],quaternion:[0,0,0,1],fov:39},to:{position:[0,5,10],quaternion:[0,0,0,1],fov:39},toMobile:{position:[0,5,10],quaternion:[0,0,0,1],fov:39},toDesktop:{position:[0,5,10],quaternion:[0,0,0,1],fov:39},toEnd:{position:[],quaternion:[],fov:39},toEndMobile:{position:[0,5,10],quaternion:[0,0,0,1],fov:37.85},toEndDesktop:{position:[0,5,10],quaternion:[0,0,0,1],fov:37.85}};for(let s in K){const e=K[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}class vn extends te{created(){const n=this.base.registerState("score",{needsUpdate:!1,onEnter:gn,onUpdate:bn,onUpdateAbsolute:xn,leave:yn}),t=K;c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.from.fov=N(t.fromMobile.fov,t.fromDesktop.fov,i),t.from.position.lerpVectors(t.fromMobile.position,t.fromDesktop.position,i),t.from.quaternion.slerpQuaternions(t.fromMobile.quaternion,t.fromDesktop.quaternion,i),t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i),t.toEnd.position.lerpVectors(t.toEndMobile.position,t.toEndDesktop.position,i),t.toEnd.quaternion.slerpQuaternions(t.toEndMobile.quaternion,t.toEndDesktop.quaternion,i)})}}function gn(){const s=this.states.score;s.camTween&&(s.camTween=s.camTween.destroy()),s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.mouseInfluence=0,s.dollyProgress=0,s.mouseX=0,s.mouseY=0,s.ang=0,s.camTween=A({target:s,property:"dollyProgress",easing:"outQuart",from:0,to:1,duration:3e3})}const Je=new C;function bn(){var t,i;const s=this.states.score,e=c.$time.stableDt,n=c.$app.$controls.touch;c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:.2,.1,e,.001),s.needsUpdate=!1,s.isUsed&&(s.camTween&&s.camTween.update(e),s.endTween&&s.endTween.update(e),this.base.fov=39,this.base.position.lerpVectors(K.from.position,K.to.position,s.dollyProgress),(i=(t=this.webgl.$game.currentChapter)==null?void 0:t.zeppelin)!=null&&i.base&&(this.base.position.x=this.webgl.$game.currentChapter.zeppelin.base.position.x,this.base.position.y=this.webgl.$game.currentChapter.zeppelin.base.position.y),Je.slerpQuaternions(K.from.quaternion,K.to.quaternion,s.dollyProgress),this.base.quaternion.slerpQuaternions(Je,K.toEnd.quaternion,s.endProgress)))}function yn(){const s=this.states.score;s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.endTween=A({target:s,property:"endProgress",easing:"inExpo",from:0,to:1,duration:600})}function xn(){}const J={from:{position:[],quaternion:[],fov:39},fromDesktop:{position:[0,5,17],quaternion:[0,0,0,1],fov:39},fromMobile:{position:[0,5,17],quaternion:[0,0,0,1],fov:39},to:{position:[0,5,10],quaternion:[0,0,0,1],fov:39},toMobile:{position:[0,5,10],quaternion:[0,0,0,1],fov:39},toDesktop:{position:[0,5,10],quaternion:[0,0,0,1],fov:39},toEnd:{position:[],quaternion:[],fov:39},toEndMobile:{position:[0,5,10],quaternion:[0,0,0,1],fov:37.85},toEndDesktop:{position:[0,5,10],quaternion:[0,0,0,1],fov:37.85}};for(let s in J){const e=J[s];e.position=new p(...e.position),e.quaternion=new C(...e.quaternion)}class wn extends te{created(){const n=this.base.registerState("scoreLastLevel",{needsUpdate:!1,onEnter:_n,onUpdate:Pn,onUpdateAbsolute:Mn,leave:Sn}),t=J;c.$store.desktopInfluence.watchImmediate(i=>{n.needsUpdate=n.isUsed,t.from.fov=N(t.fromMobile.fov,t.fromDesktop.fov,i),t.from.position.lerpVectors(t.fromMobile.position,t.fromDesktop.position,i),t.from.quaternion.slerpQuaternions(t.fromMobile.quaternion,t.fromDesktop.quaternion,i),t.to.fov=N(t.toMobile.fov,t.toDesktop.fov,i),t.to.position.lerpVectors(t.toMobile.position,t.toDesktop.position,i),t.to.quaternion.slerpQuaternions(t.toMobile.quaternion,t.toDesktop.quaternion,i),t.toEnd.position.lerpVectors(t.toEndMobile.position,t.toEndDesktop.position,i),t.toEnd.quaternion.slerpQuaternions(t.toEndMobile.quaternion,t.toEndDesktop.quaternion,i)})}}function _n(){const s=this.states.scoreLastLevel;s.camTween&&(s.camTween=s.camTween.destroy()),s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.mouseInfluence=0,s.dollyProgress=0,s.mouseX=0,s.mouseY=0,s.ang=0,s.camTween=A({target:s,property:"dollyProgress",easing:"inOutSine",delay:0,from:0,to:1,duration:5e3})}const et=new C;function Pn(){var t,i;const s=this.states.scoreLastLevel,e=c.$time.stableDt,n=c.$app.$controls.touch;c.$game.isPaused()||(s.mouseInfluence=ae(s.mouseInfluence,!s.isUsed||n.useTouch?0:.2,.1,e,.001),s.needsUpdate=!1,s.isUsed&&(s.camTween&&s.camTween.update(e),s.endTween&&s.endTween.update(e),this.base.fov=39,this.base.position.lerpVectors(J.from.position,J.to.position,s.dollyProgress),(i=(t=this.webgl.$game.currentChapter)==null?void 0:t.zeppelin)!=null&&i.base&&(this.base.position.x=this.webgl.$game.currentChapter.zeppelin.base.position.x,this.base.position.y=this.webgl.$game.currentChapter.zeppelin.base.position.y),et.slerpQuaternions(J.from.quaternion,J.to.quaternion,s.dollyProgress),this.base.quaternion.slerpQuaternions(et,J.toEnd.quaternion,s.endProgress)))}function Sn(){const s=this.states.scoreLastLevel;s.endTween&&(s.endTween=s.endTween.destroy()),s.endProgress=0,s.endTween=A({target:s,property:"endProgress",easing:"inExpo",from:0,to:1,duration:600})}function Mn(){}const xe=()=>{};class Tn extends Zt{get mixins(){return[Ds,an,Js,vn,Is,hn,Os,wn]}init(){this.base=this.cam=new qt,this.base.fov=39,this.base.near=.2,this.base.far=1e3,this.prevFov=this.base.fov,this.accumPosition=new p,this.accumQuaternion=new C,this.offsetX={value:0},this.previousGameState=0,this.isOffseting=!1,this.mousePos={x:0,y:0,normalizedX:0,normalizedY:0};const e=this.webgl.$app.$store;this.onMouseMove=this.onMouseMove.bind(this),this.webgl.$app.$device.hasTouch||document.addEventListener("mousemove",this.onMouseMove),Nt(()=>e.isPanelOpen,n=>{var l,r,u;if(!((u=(r=(l=this.webgl)==null?void 0:l.$game)==null?void 0:r.state)!=null&&u.is("Game")))return;const{width:t,height:i}=this.webgl.$viewport.size.get(),o=e.isRTL?-1:1,a=n?-e.panelWidth*.5*o:0;this.isOffseting=!0,Y().to(this.offsetX,{value:a,duration:n?1e3:600,easing:Ae.outSwift,onProgress:()=>{this.base.setViewOffset(t,i,this.offsetX.value,0,t,i)},onComplete:()=>{this.isOffseting=!1}})})}registerState(e,n={}){this.states||(this.states={}),this.states[e]=n,n.id=e;for(let t in n)typeof n[t]=="function"&&(n[t]=n[t].bind(this));return n.onEnter||(n.onEnter=xe),n.onUpdate||(n.onUpdate=xe),n.onUpdateAbsolute||(n.onUpdateAbsolute=xe),n.onLeave||(n.onLeave=xe),n.isUsed=!1,n.prevTime=-1,n.time=0,n.hasReached=t=>n.prevTime<t&&n.time>=t,n}setState(e,{force:n}={}){if(!this.states[e]||this.state===this.states[e]&&!n)return;const t=this.state;t&&(t.onLeave(),t.isUsed=!1),this.state=this.states[e],this.state.isUsed=!0,this.state.prevTime=-1,this.state.time=0,this.state.onEnter(t)}destroy(){this.webgl.$app.$device.hasTouch||document.removeEventListener("mousemove",this.onMouseMove),super.destroy()}onMouseMove(e){this.mousePos.x=e.clientX,this.mousePos.y=e.clientY,this.mousePos.normalizedX=e.clientX/this.webgl.$viewport.size.value.width,this.mousePos.normalizedY=e.clientY/this.webgl.$viewport.size.value.height}update(){const e=this.webgl.$time.stableDt;this.prevFov!==this.base.fov&&(this.base.updateProjectionMatrix(),this.prevFov=this.base.fov),this.base.position.copy(this.accumPosition),this.base.quaternion.copy(this.accumQuaternion);for(let n in this.states){const t=this.states[n];t.prevTime=t.time,t.time+=e,t.onUpdate(e)}this.accumPosition.copy(this.base.position),this.accumQuaternion.copy(this.base.quaternion);for(let n in this.states)this.states[n].onUpdateAbsolute(e);this.base.updateProjectionMatrix(),this.updateShake()}}const tt=new p,An=new p;new p(1,0,0);class Cn{constructor(e,n){this.pool=n;const{position:t,size:i,hitbox:o,visible:a=!1,still:l=!1}=e,r=oe.$device.type.phone,u=oe.$device.type.phone?2:1,h=de(i*.6*u),g=Oe(o*.7)??{x:1,y:1};r&&(t.y+=2),this.data={position:t,scale:h,size:g,still:l},this.instance=this.pool.add(1)[0],this.instance.position.copy(t),this.instance.scale.copy(h),this.instance.visible=a,this.position=this.instance.position,this.scale=this.instance.scale,this.rotation=this.instance.rotation,this.body=new Re({label:"collectible",x:t.x,y:t.y,z:t.z,enabled:!0,shape:"circle",width:o}),this.body.onCollide(this.onCollide.bind(this)),this.sprites=[];const v=this.parent={matrixWorld:this.instance.matrix},f=tt.set(0,0,-.1);this.emitterDelay=0,this.glow=new E({batcher:"gem_normal",sprite:"base",billboard:!0,scale:.04,parent:v,position:f}),this.glowLarge=new E({batcher:"gem_emissive",sprite:"flash",billboard:!0,scale:.02,alpha:.4,parent:v,position:f}),this.flareA=new E({batcher:"gem_normal",sprite:"sparkle_b",scale:.06,billboard:!0,alpha:.5,parent:v,position:f}),this.flareAGlow=new E({batcher:"gem_emissive",sprite:"sparkle_b",scale:.08,billboard:!0,alpha:.1,parent:v,position:f}),this.flareB=new E({batcher:"gem_normal",sprite:"sparkle_b",scale:{x:.06,y:.03},billboard:!0,angle:Math.PI/2,alpha:.5,parent:v,position:f}),this.flareBGlow=new E({batcher:"gem_emissive",sprite:"sparkle_b",scale:{x:.08,y:.04},billboard:!0,angle:Math.PI/2,alpha:.1,parent:v,position:f}),this.shinyFlareA=new E({batcher:"gem_emissive",sprite:"sparkle_d",scale:{x:.03,y:.04},billboard:!0,parent:v,position:f}),this.shinyFlareB=new E({batcher:"gem_emissive",sprite:"sparkle_d",scale:{x:.03,y:.04},billboard:!0,angle:Math.PI/4,parent:v,position:f}),this.shinyFlareC=new E({batcher:"gem_emissive",sprite:"sparkle_a",scale:.03,billboard:!0,angle:Math.PI/-4,parent:v,position:f}),this.pool.refresh(!0)}onCollide(e){var v;if(!this.body.enabled)return;const{scene:n,$game:t,$particles:i,$app:o,playSound:a}=c;o.$store.currentScore+=1,this.body.enabled=!1,this.instance.visible=!1,this.instance.isAlive.set(!1),t.boost(.05,1),this.flareA&&(this.flareA.visible=!1),this.flareAGlow&&(this.flareAGlow.visible=!1),this.flareB&&(this.flareB.visible=!1),this.flareBGlow&&(this.flareBGlow.visible=!1),this.shinyFlareA&&(this.shinyFlareA.visible=!1),this.shinyFlareB&&(this.shinyFlareB.visible=!1),this.shinyFlareC&&(this.shinyFlareC.visible=!1),this.glow&&(this.glow.visible=!1),this.glowLarge&&(this.glowLarge.visible=!1);const l=p.get();l.copy(this.position),a("sfx_Pickup_Big_Collect");const r=n.zeppelin.base.position,u=tt.copy(this.position).sub(r).normalize();u.y+=1,u.normalize();const h=An.copy(e).sub(r),g=y.get();c.$particles.emit("collectibleBurst",{amount:I.randomInt(20,30),position:this.position,scale:g.set(1,1).setScalar(.003*1),duration:800,opacity:.3,depthTest:!0,sprite:"glow-denser",batcher:"gem_emissive",color:new m(16761133)}),g.release(),(v=this.emittedParticles)==null||v.forEach(f=>f.kill()),i.emit("sparkles",{batcher:"gem_emissive",position:h,sprite:"wave-glow",scale:0,scaleTo:.015,alpha:.4,color:new m(16761133),alphaTo:0,duration:.3,parent:n.zeppelin.base}),i.emit("sparkles",{batcher:"gem_emissive",position:h,sprite:"flash",scale:0,scaleTo:.02,color:new m(16761133),alpha:.5,alphaTo:0,duration:.1,parent:n.zeppelin.base}),i.emit("sparkles",{batcher:"gem_emissive",position:h,sprite:"flash",scale:0,scaleTo:.03,color:new m(16761133),alpha:.2,alphaTo:0,duration:.25,parent:n.zeppelin.base}),l.copy(this.position),l.y+=.5,l.release(),"collided"in this&&this.collided()}reset(){this.body.enabled=!0,this.instance.visible=!1,this.instance.isAlive.set(!0),this.position.copy(this.data.position),this.scale.copy(this.data.scale),this.flareA&&(this.flareA.visible=!0),this.flareAGlow&&(this.flareAGlow.visible=!0),this.flareB&&(this.flareB.visible=!0),this.flareBGlow&&(this.flareBGlow.visible=!0),this.shinyFlareA&&(this.shinyFlareA.visible=!0),this.shinyFlareB&&(this.shinyFlareB.visible=!0),this.shinyFlareC&&(this.shinyFlareC.visible=!0),this.glow&&(this.glow.visible=!0),this.glowLarge&&(this.glowLarge.visible=!0),this.pool.refresh(!0)}mount(){var e,n,t,i,o,a,l,r,u;(e=this.glow)==null||e.addToBatcher(),(n=this.glowLarge)==null||n.addToBatcher(),(t=this.flareA)==null||t.addToBatcher(),(i=this.flareAGlow)==null||i.addToBatcher(),(o=this.flareB)==null||o.addToBatcher(),(a=this.flareBGlow)==null||a.addToBatcher(),(l=this.shinyFlareA)==null||l.addToBatcher(),(r=this.shinyFlareB)==null||r.addToBatcher(),(u=this.shinyFlareC)==null||u.addToBatcher(),this.body.enabled=!0}unmount(){var e,n,t,i,o,a,l,r,u;(e=this.glow)==null||e.removeFromBatcher(),(n=this.glowLarge)==null||n.removeFromBatcher(),(t=this.flareA)==null||t.removeFromBatcher(),(i=this.flareAGlow)==null||i.removeFromBatcher(),(o=this.flareB)==null||o.removeFromBatcher(),(a=this.flareBGlow)==null||a.removeFromBatcher(),(l=this.shinyFlareA)==null||l.removeFromBatcher(),(r=this.shinyFlareB)==null||r.removeFromBatcher(),(u=this.shinyFlareC)==null||u.removeFromBatcher(),this.instance.visible=!1,this.body.enabled=!1}update(){const{$game:e,$time:n,$particles:t}=c,i=n.dt,o=n.elapsed,a=0;if(this.body.enabled&&(Le.Body.setPosition(this.body.base,{x:this.data.position.x+a,y:this.position.y}),this.position.copy(this.body.base.position),this.instance.isAlive.value&&(this.instance.visible=this.instance.isInViewport),!(!this.instance.isInViewport||!this.body.enabled))){if(this.glow&&(this.glow.scale.x=.03+Math.sin(o*.0026)*.001,this.glow.scale.y=.03+Math.sin(o*.0026)*.001),this.shinyFlareA&&(this.shinyFlareA.angle-=i*6e-4,this.shinyFlareA.scale.x=.03+Math.sin(o*.0026)*.004,this.shinyFlareA.scale.y=.04+Math.sin(o*.0028)*.02),this.shinyFlareB&&(this.shinyFlareB.angle-=i*8e-4,this.shinyFlareB.scale.x=.03+Math.sin(o*.0028)*.004,this.shinyFlareB.scale.y=.04+Math.sin(o*.0025)*.02),this.shinyFlareC&&(this.shinyFlareC.angle-=i*5e-4,this.shinyFlareC.scale.x=.025+Math.sin(o*.003)*.004,this.shinyFlareC.scale.y=.025+Math.sin(o*.003)*.002),this.emitterDelay>0){this.emitterDelay-=i;return}this.emitterDelay=500,this.emittedParticles=t.emit("gem_idle",{batcher:"gem_emissive",amount:3,billboard:!0,position:this.position})}}setColors(e,n){var t,i,o,a,l,r;(t=this.glow)==null||t.color.set(e),(i=this.glowLarge)==null||i.color.set(n),(o=this.flareA)==null||o.color.set(n),(a=this.flareB)==null||a.color.set(n),(l=this.flareAGlow)==null||l.color.set(n),(r=this.flareBGlow)==null||r.color.set(n)}}const zn=`#define PI 3.141592653589793
#define saturate(t) clamp(t, 0., 1.)
uniform sampler2D atlas;
uniform sampler2D tNoise;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float time;
varying float vType;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
uniform float uPower;
uniform float uBias;
uniform float uScale;
#include <lighten>
#include <saturate>
#include <map>
#include <luma>
#include <blending_pars_fragment>
float circularOut(float t) {
  return sqrt((2.0 - t) * t);
}
float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}
float fakeFresnel(vec2 uv, float bias, float scale, float power) {
return bias + scale * pow(length(uv - 0.5), power);
}
void main() {
vec2 uv = vUv;
bool isPlane = vType == 1.;
vec4 final = vec4(0.);
float wave = sineInOut(abs(2.0 * fract(length(vUv - 0.5) - time * 0.001) - 1.0));
float len = length((vUv - 0.5) * 2.);
float f = 1. - saturate(smoothstep(0.8, .85, len));
vec3 color = vec3(0);
color = mix(uColorA, uColorA + .5, smoothstep(1., .0, len));
color = mix(color, uColorB, smoothstep(0.5, 1., len));
final = vec4(color, 1.);
gl_FragColor = final;
}`,Dn=P(zn,"fragmentShader"),$n=`attribute float aType;
uniform float time;
varying float vType;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
#include <morphtarget_pars_vertex>
mat3 rotateOnY( float angle ) {
float s = sin( angle );
float c = cos( angle );
return mat3( c, 0, -s, 0, 1, 0, s, 0, c );
}
mat3 rotateOnX( float angle ) {
float s = sin( angle );
float c = cos( angle );
return mat3( 1, 0, 0, 0, c, s, 0, -s, c );
}
#define PI 3.141592653589793
float sineInOut(float t) {
  return -0.5 * (cos(PI * t) - 1.0);
}
const float SIZE_ANIM_DURATION = 1500.0;
void main() {
bool isPlane = aType == 1.;
vUv = uv;
vType = aType;
#include <beginnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
vec3 scale = vec3(
length(vec3(instanceMatrix[0][0], instanceMatrix[0][1], instanceMatrix[0][2])),
length(vec3(instanceMatrix[1][0], instanceMatrix[1][1], instanceMatrix[1][2])),
length(vec3(instanceMatrix[2][0], instanceMatrix[2][1], instanceMatrix[2][2]))
);
vec4 mvPosition = vec4( vec3(0), 1.0 );
#ifdef USE_INSTANCING
mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
mvPosition.xyz += transformed * scale;
vViewPosition = -mvPosition.xyz;
gl_Position = projectionMatrix * mvPosition;
#include <worldpos_vertex>
}`,En=P($n,"vertexShader");class pt extends H{constructor({depthTest:n=!1,depthWrite:t=!1,...i}={}){super(i);U(this,"name","GemMaterial");this.uniforms={...c.uniforms,...i.uniforms},this.defines||(this.defines={}),Object.assign(this.defines,{...c.defines,...i.defines}),this.transparent=!0,this.premultipliedAlpha=!0,this.depthTest=n,this.depthWrite=t,En.use(this),Dn.use(this)}}class In extends O{init(){const{$game:e,$assets:n,$store:t}=this.webgl,{datas:i}=this.props;if(!i)return;const o=i.length+1;this.collectibles=[],this._visible=!0,this.primaryColor=new m,this.secondaryColor=new m;const a=n.geometries.register("sphere",ht,.5),l=this.material=new pt({uniforms:{uColorA:{value:new m(16777215)},uColorB:{value:new m(16777215)},uBias:{value:.3},uScale:{value:2},uPower:{value:5}}});this.pool=new Be(a,l,o),this.base=this.pool.base,this.base.renderOrder=t.z.particles,this.base.layers.enable(t.layers.COLLIDABLE);for(let r=0;r<i.length;r++){const u=i[r],h=new Cn(u,this.pool);this.collectibles.push(h)}this.resetHandler=()=>this.collectibles.forEach(r=>r.reset()),this.webgl.hooks.beforePrerender.watch(()=>{this.base.count=1}),this.webgl.hooks.afterPrerender.watch(()=>{this.base.count=0})}mount(){var t;const{$game:e,$assets:n}=this.webgl;(t=this.collectibles)==null||t.forEach(i=>{i.reset(),i.mount()}),e.events.reset.watch(this.resetHandler)}unMount(){var n;const{$game:e}=this.webgl;(n=this.collectibles)==null||n.forEach(t=>{t.unmount()}),e.events.reset.unwatch(this.resetHandler)}update(){var e;this.webgl.$game.isPaused()||(this.collectibles.forEach(n=>n.update()),(e=this.pool)==null||e.refresh(!0))}setColors(e=this.primaryColor,n=this.secondaryColor){this.primaryColor.set(e),this.secondaryColor.set(n),this.material.uniforms.uColorA.value.set(e),this.material.uniforms.uColorB.value.set(n),this.collectibles.forEach(t=>t.setColors(e,n))}dispose(){this.pool.dispose()}get visible(){return this._visible}set visible(e){this._visible=e,this.base.visible=e;const n=e?"mount":"unmount";this.collectibles.forEach(t=>t[n]())}}const le=new p,Ee=new p,kn={sea_of_clouds:{light:new m(16439996).convertLinearToSRGB(),dark:new m(13672078).convertLinearToSRGB()},frozen_lake:{light:new m(12380925).convertLinearToSRGB(),dark:new m(10535665).convertLinearToSRGB()},starry_night:{light:new m(1644851).convertLinearToSRGB(),dark:new m(1644851).convertLinearToSRGB()}};class Fn{constructor(e,n){this.pool=n;const{position:t,size:i,hitbox:o}=e,a=oe.$device.type.phone,l=de(i),r=Oe(o)??{x:1,y:1};a&&(t.y+=2),this.data={position:t,scale:l,size:r},this.instance=this.pool.add(1)[0],this.instance.position.copy(t),this.instance.scale.copy(l),this.instance.visible=!0,this.position=this.instance.position,this.scale=this.instance.scale;const u=this.parent={matrixWorld:this.instance.matrix};this.body=new Re({label:"boost",x:t.x,y:t.y,z:t.z,enabled:!0,shape:"rectangle",width:r.x,height:r.y}),this.glow=new E({batcher:"gem_emissive",sprite:"flash",billboard:!0,color:kn[e.levelName].light,scale:new y(.006,.01),alpha:.3,parent:u}),this.body.onCollide(this.onCollide.bind(this)),this.pool.refresh(!0),this.emitWindTrails=Lt(h=>!c.$game.isPaused()&&c.$particles.emit("boost_trail",{batcher:"trail",speedMult:2,amount:8,position:h,thicknessMult:3}),500)}reset(){this.body.enabled=!0,this.position.copy(this.data.position),this.scale.copy(this.data.scale),this.instance.visible=!0,this.instance.data.scaleProgress=0,this.instance.data.alpha=1,this.glow&&(this.glow.visible=!0),this.pool.refresh(!0)}mount(){var e;(e=this.glow)==null||e.addToBatcher(),this.reset()}unmount(){var e;this.body.enabled=!1,(e=this.glow)==null||e.removeFromBatcher()}onCollide(){const{$game:e,$particles:n,playSound:t}=c;this.body.enabled=!1,this.glow&&(this.glow.visible=!1),e.boost(.075,1),t("Sfx_Pickup_Ring_Boost"),n.emit("boost_trail",{batcher:"trail",amount:30,speedMult:3,amplitudeMult:2,thicknessMult:3,trailLengthMult:2,alpha:.7,duration:2e3,position:this.position}),n.emit("sparkles",{batcher:"gem_emissive",sprite:"wave-glow",scale:0,scaleTo:new y(.004*2,.015*2),alpha:.5,alphaTo:0,duration:.4,position:this.position}),n.emit("sparkles",{batcher:"gem_emissive",position:this.position,sprite:"directional-flash",scale:new y(.01,.006),scaleTo:new y(.02,.012),alpha:.2,alphaTo:0,duration:.4}),le.copy(this.position),le.x+=.8,Ee.set(1,0,0),n.emit("sparkles",{batcher:"gem_emissive",sprite:"wave-glow",scale:0,scaleTo:new y(.004*1.3,.015*1.3),alpha:.5,alphaTo:0,duration:.4,delay:.1,direction:Ee,velocity:3,damping:1,position:le}),le.copy(this.position),le.x+=1.2,n.emit("sparkles",{batcher:"gem_emissive",sprite:"wave-glow",scale:0,scaleTo:new y(.004*1,.015*1),alpha:.5,alphaTo:0,duration:.4,delay:.2,direction:Ee,velocity:6,damping:1,position:le}),Y().to(this.instance.data,{scaleProgress:1,duration:200,ease:"expoOut"}),Y().to(this.instance.data,{alpha:0,duration:200,delay:0,ease:"linear"})}update(){Le.Body.setPosition(this.body.base,{x:this.data.position.x,y:this.position.y}),this.position.copy(this.body.base.position),!(!this.instance.isInViewport||!this.body.enabled)&&this.emitWindTrails(this.position)}setColors(e,n){this.instance.color.set(e)}}const Un=`#define PI 3.1415926535897932384626433832795
uniform vec3 uColor;
uniform float time;
uniform sampler2D tMatcap;
uniform sampler2D tAlpha;
uniform sampler2D tNoise;
#include <luma>
#include <zoom>
#include <rotateUv>
#include <saturate>
uniform float isStormy;
varying float vType;
varying float vAlpha;
varying vec2 vUv;
varying vec2 vViewNormal;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;
varying float vScaleProgress;
uniform float isStarryNight;
uniform float isSeaOfClouds;
#ifdef USE_INSTANCING_COLOR
varying vec3 vColor;
#endif
#ifdef USE_ENVMAP
uniform samplerCube envMap;
uniform float envMapIntensity;
uniform float reflectivity;
#endif
float segment(vec2 P, vec2 A, vec2 B, float r) {
vec2 g = B - A;
vec2 h = P - A;
float d = length(h - g * clamp(dot(g, h) / dot(g,g), 0.0, 1.0));
return smoothstep(r, 0.5 * r, d);
}
float line(vec2 p, vec2 a,vec2 b) {    p -= a, b -= a;
    float h = clamp(dot(p, b) / dot(b, b), 0., 1.);    return length(p - b * h);}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 computeEnvMap(vec3 _d) {
vec3 diffuseColor = _d;
#ifdef USE_ENVMAP
vec3 cameraToFrag = normalize(vWorldPosition - cameraPosition);
vec3 worldNormal = inverseTransformDirection( vNormal, viewMatrix );
vec3 reflectVec = reflect( cameraToFrag, worldNormal );
vec4 envColor = textureCube( envMap, vec3( -1. * reflectVec.x, reflectVec.yz ) );
diffuseColor.rgb = mix( diffuseColor.rgb, diffuseColor.rgb + envColor.rgb * .4, reflectivity );
#endif
return diffuseColor;
}
float fresnelFunc(vec3 viewDirection, vec3 worldNormal, float bias, float scale, float power) {
    return bias + scale * pow( 1.0 - dot( viewDirection, worldNormal), power );
}
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
float noiseF(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);
    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);
    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);
    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));
    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
    return o4.y * d.y + o4.x * (1.0 - d.y);
}
void main() {
vec2 uv = vUv;
vec4 final = vec4(0.);
vec2 noiseUv;
noiseUv = vViewNormal.xy;
noiseUv = rotateUv(noiseUv, time * .0015);
noiseUv = zoom(noiseUv + sin(time * .00025), 10.);
float noise = noiseF(vWorldPosition*1. + time * .0005);
noise = smoothstep(0., 1., noise);
vec2 mc_uv = vViewNormal.xy;
vec4 matcapTex = texture2D(tMatcap, mc_uv);
vec4 matcapColor = matcapTex;
float rimLightPower = .935;
float rimLightStrength = 1.;
float rightLight = rimLightPower * abs( dot( vNormal, normalize( vViewPosition ) ) );
rightLight = 1. - smoothstep(.0, 1., rightLight );
final.rgb = mix(mix(vec3(.3, .3, .4), vec3(0.2, .2, .3), isStormy), mix(vec3(.4, .5, .9), vec3(0.5, .5, .55), isStormy), (noise));
final.rgb = mix(final.rgb, mix(vec3(.8, .4, .2)*.9, vec3(.04, .02, .1), isStormy), isSeaOfClouds);
final.rgb = mix(final.rgb, mix(mix(vec3(0.19,0.3,0.7)*.8, vec3(0.302,0.369,0.514), isStormy),mix(vec3(0.21,0.243,0.5)*.1, vec3(0.184,0.243,0.447)*.5, isStormy), (1.-noise)), isStarryNight);
final.a = 1.;
vec4 alphaTex = texture2D(tAlpha, mc_uv);
float edgeMask = length(alphaTex.rgb);
edgeMask = 1. - edgeMask;
final.rgb = mix(final.rgb, computeEnvMap(final.rgb * 1.).rgb , (1.- isStarryNight));
final.rgb += luma(final.rgb) * .5 * ((1.-vAlpha) * (1.-isStarryNight));
final.rgb = mix(_saturate(final.rgb, 1.), final.rgb, mix(vAlpha,  1.,isStarryNight)) ;
final.rgb *= mix(_saturate(final.rgb, 4.), vec3(1.), mix(vAlpha,  1.,isStarryNight));
final.rgb += luma(final.rgb) * .6 * ((1.-vAlpha) * (1.-isStarryNight));
float f = fresnelFunc(normalize(vViewPosition), vNormal, 0.1, 1., 40.);
#ifdef USE_INSTANCING_COLOR
final.rgb *= vColor;
#endif
gl_FragColor = final;
gl_FragColor.a *= 1.-(rightLight * rimLightStrength) * 1.;
gl_FragColor.a -= noise * mix(.1, .1, vAlpha);
gl_FragColor.a *= vAlpha;
if (gl_FragColor.a <= 0.) discard;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,qn=P(Un,"fragmentShader"),Nn=`attribute float aType;
uniform float time;
attribute float scaleProgress;
attribute float alpha;
varying float vType;
varying vec2 vUv;
varying vec2 vViewNormal;
varying float vAlpha;
varying float vScaleProgress;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;
#ifdef USE_INSTANCING_COLOR
varying vec3 vColor;
#endif
#include <morphtarget_pars_vertex>
#include <map>
vec3 mod289(vec3 x) {
return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 mod289(vec4 x) {
return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec4 permute(vec4 x) {
return mod289(((x * 34.0) + 1.0) * x);
}
vec4 taylorInvSqrt(vec4 r) {
return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
float pnoise(vec3 P, vec3 rep) {
vec3 Pi0 = mod(floor(P), rep);vec3 Pi1 = mod(Pi0 + vec3(1.0), rep);Pi0 = mod289(Pi0);
Pi1 = mod289(Pi1);
vec3 Pf0 = fract(P);vec3 Pf1 = Pf0 - vec3(1.0);vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = Pi0.zzzz;
vec4 iz1 = Pi1.zzzz;
vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);
vec4 gx0 = ixy0 * (1.0 / 7.0);
vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
gx0 = fract(gx0);
vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
vec4 sz0 = step(gz0, vec4(0.0));
gx0 -= sz0 * (step(0.0, gx0) - 0.5);
gy0 -= sz0 * (step(0.0, gy0) - 0.5);
vec4 gx1 = ixy1 * (1.0 / 7.0);
vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
gx1 = fract(gx1);
vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
vec4 sz1 = step(gz1, vec4(0.0));
gx1 -= sz1 * (step(0.0, gx1) - 0.5);
gy1 -= sz1 * (step(0.0, gy1) - 0.5);
vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
g000 *= norm0.x;
g010 *= norm0.y;
g100 *= norm0.z;
g110 *= norm0.w;
vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
g001 *= norm1.x;
g011 *= norm1.y;
g101 *= norm1.z;
g111 *= norm1.w;
float n000 = dot(g000, Pf0);
float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
float n111 = dot(g111, Pf1);
vec3 fade_xyz = fade(Pf0);
vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
return 2.2 * n_xyz;
}
mat3 rotation3dY(float angle) {
float s = sin(angle);
float c = cos(angle);
return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}
vec3 rotateY(vec3 v, float angle) {
return rotation3dY(angle) * v;
}
void main() {
vUv = uv;
vType = aType;
#ifdef USE_INSTANCING_COLOR
vColor = instanceColor;
#endif
const float Speed = .001;
const float NoiseDensity = 3.;
const float NoiseStrength = .1;
const float Frequency = 7.;
const float Amplitude = .05;
#include <begin_vertex>
#include <morphtarget_vertex>
float timeNoise = pnoise(vec3(time * .0001), vec3(3.0)) * -.1;
float t = time * .7 * Speed + timeNoise;
float distortion = pnoise((position * .4 + t) * NoiseDensity, vec3(20.0)) * NoiseStrength;
vec3 pos = transformed + mix((  vec3(distortion*.4)), vec3(0), scaleProgress);
float angle = sin(uv.y * Frequency + t) * Amplitude;
transformed = pos;
transformed += normal * mix(0., -0.1, scaleProgress);
transformed *= mix(1., 2., scaleProgress);
vScaleProgress = scaleProgress;
#include <project_vertex>
#include <worldpos_vertex>
vec4 p = vec4(position, 1.);
vec3 e = normalize(vec3(modelViewMatrix * p));
vec3 n = normalize(normalMatrix * normal);
vec3 r = reflect(e, n);
float m = 2. * sqrt(pow(r.x, 2.) +
pow(r.y, 2.) +
pow(r.z + 1., 2.));
vViewNormal = r.xy / m + .5;
vAlpha = alpha;
vNormal = normalize(normal);
vWorldPosition = worldPosition.xyz;
vViewPosition = -mvPosition.xyz;
}`,Ln=P(Nn,"vertexShader");class On extends H{constructor({color:n=16766720,...t}={}){var i;super(t);U(this,"name","BoostMaterial");this.uniforms={...c.uniforms,...t.uniforms,res:c.$renderer.drawingBufferSize,tNoise:{value:c.$assets.textures.perlinNoise},tMatcap:{value:c.$assets.textures["boost-matcap"]},tAlpha:{value:c.$assets.textures["boost-alpha"]},uColor:{value:new m(n)},isStormy:{value:0}},this.defines||(this.defines={}),(i=t.uniforms)!=null&&i.envMap&&(this.defines.USE_ENVMAP=!0),Object.assign(this.defines,{...c.defines,...t.defines}),this.transparent=!0,this.forceSinglePass=!0,Ln.use(this),qn.use(this)}}class Rn extends O{init(){const{$store:e,$game:n}=this.webgl,{datas:t}=this.props;if(!t)return;const i=t.length;this.boosts=[],this._visible=!0,this.primaryColor=new m,this.secondaryColor=new m;const o=new Ot(.8,.275,40,40).rotateY(Math.PI*.5),a=this.material=new On({uniforms:{envMap:{value:n.envMap},envMapIntensity:{value:1},reflectivity:{value:1},isStarryNight:{value:this.parent.parent.name==="starry_night"?1:0},isFrozenLake:{value:this.parent.parent.name==="frozen_lake"?1:0},isSeaOfClouds:{value:this.parent.parent.name==="sea_of_clouds"?1:0}}});this.pool=new Be(o,a,i),this.base=this.pool.base,this.base.renderOrder=e.z.particles,this.base.layers.enable(e.layers.COLLIDABLE);for(let r=0;r<t.length;r++){const u=t[r];u.levelName=this.parent.parent.name;const h=new Fn(u,this.pool);this.boosts.push(h)}const l=[];this.pool.forEachInstance(({data:r})=>{r.scaleProgress=0,r.alpha=1,l.push(0)}),this.base.geometry.setAttribute("scaleProgress",new q(new Float32Array(l),1)),this.base.geometry.setAttribute("alpha",new q(new Float32Array(l),1)),this.resetHandler=()=>this.boosts.forEach(r=>r.reset()),this.update(),this.webgl.hooks.beforePrerender.watch(()=>{this.base.count=1}),this.webgl.hooks.afterPrerender.watch(()=>{this.base.count=0})}mount(){var n;const{$game:e}=this.webgl;(n=this.boosts)==null||n.forEach(t=>t.mount()),e.events.reset.watch(this.resetHandler),this.update()}unMount(){var n;const{$game:e}=this.webgl;(n=this.boosts)==null||n.forEach(t=>{t.unmount()}),e.events.reset.unwatch(this.resetHandler)}update(){this.boosts.forEach(t=>t.update());const{scaleProgress:e,alpha:n}=this.base.geometry.attributes;this.pool.refresh(!0),this.pool.forEach((t,i)=>{e.setX(i,t.data.scaleProgress),n.setX(i,t.data.alpha)}),e.needsUpdate=!0,n.needsUpdate=!0,this.base.material.uniforms.isStormy.value=this.webgl.$game.stormProgressUniform.value}setColors(e=this.primaryColor,n=this.secondaryColor){this.material.uniforms.uColor.value.set(e),this.boosts.forEach(t=>t.setColors(e,n))}dispose(){this.pool.dispose()}get visible(){return this._visible}set visible(e){this._visible=e,this.base.visible=e;const n=e?"mount":"unmount";this.boosts.forEach(t=>t[n]())}}const st=new p;class Bn{constructor(e,n,t){this.collectible=n,this.instance=n.instance,this.combo=e,this.body=t,this.position=this.instance.position,this.scale=this.instance.scale,this.rotation=this.instance.rotation,this._visible=!0,this.parent={matrixWorld:this.instance.matrix};const i=st.set(0,0,-.1);this.glow=new E({batcher:"gem_emissive",sprite:"flash",billboard:!0,scale:.015,alpha:.5,visible:this._visible,position:i,parent:this.parent}),this.glowDense=new E({batcher:"gem_normal",sprite:"base",billboard:!0,scale:.035,visible:this._visible,position:i,parent:this.parent}),this.body.onCollide(o=>this.collided(o))}update(){}mount(){var e,n;this.body.enabled=!0,(e=this.glow)==null||e.addToBatcher(),(n=this.glowDense)==null||n.addToBatcher()}unMount(){var e,n;this.body.enabled=!1,(e=this.glow)==null||e.removeFromBatcher(),(n=this.glowDense)==null||n.removeFromBatcher()}reset(){const{position:e,rotation:n,scale:t,instance:i}=this.collectible;this.body.enabled=!0,i.visible=!0,this.position.copy(e),this.rotation.setFromVector3(n),this.scale.copy(t)}collided(e){if(!this.body.enabled)return;const{index:n,tween:t,instance:i}=this.collectible,{$game:o,$particles:a,playSound:l,scene:r}=c;n===this.combo.sequence+1?this.combo.sequence+=1:this.combo.isBroken=!0;const u=r.zeppelin.base.position,h=st.copy(e).sub(u);l("sfx_Pickup_Small_Combo"),this.body.enabled=!1,t==null||t.destroy(),Y().to(i.scale,{x:.001,y:.001,z:.001,duration:100,onComplete:()=>{this.visible=!1,i.visible=!1}});const g=new m(this.secondaryColor);new m(this.secondaryColor).multiplyScalar(2.5);const v=y.get();c.$particles.emit("collectibleBurst",{amount:I.randomInt(5,6),position:this.position,scale:v.set(1,1).setScalar(.003*1),duration:500,opacity:.1,depthTest:!0,sprite:"glow-denser",batcher:"gem_emissive",color:g}),v.release(),a.emit("sparkles",{batcher:"gem_emissive",position:h,sprite:"wave-glow",scale:0,scaleTo:.008,alpha:.15,alphaTo:0,duration:.3,parent:r.zeppelin.base}),a.emit("sparkles",{batcher:"gem_emissive",position:h,sprite:"flash",scale:0,scaleTo:.01,alpha:.5,alphaTo:0,duration:.15,parent:r.zeppelin.base}),n===this.combo.collectibles.length-1&&!this.combo.isBroken?(o.boost(.065,1),l("Sfx_Pickup_Ring_Boost")):o.speedUp()}get visible(){return this._visible}set visible(e){this._visible=e,this.glow&&(this.glow.visible=e),this.glowDense&&(this.glowDense.visible=e)}}const Vn=6,nt=new Rt,it=new p,Wn=new p;let we=0;class Gn{constructor(e,n,t){this.collectible=n,this.instance=n.instance,this.combo=e,this.body=t,this.position=this.instance.position,this.scale=this.instance.scale,this.rotation=this.instance.rotation,this._visible=!1,this.parent={matrixWorld:this.instance.matrix};const i=it.set(0,0,-.1);this.glow=new E({batcher:"gem_emissive",sprite:"flash",billboard:!0,scale:.015,alpha:.5,visible:this._visible,position:i,parent:this.parent}),this.glowDense=new E({batcher:"gem_normal",sprite:"base",billboard:!0,scale:.035,visible:this._visible,position:i,parent:this.parent}),this.trails=[];for(let o=0;o<Vn;o++){const a=new jt({batcher:"trail",sprite:"sparkleB",parent:this.parent,thickness:.03,trailLength:2,fk:!0,visible:this._visible,alpha:.8});a.random=Math.random(),this.trails.push(a)}this.body.onCollide(o=>this.collided(o))}update(e){if(!this.body.enabled)return;const{$game:n,$time:t}=c,i=t.elapsed*.001;this.trails.forEach((o,a)=>{if(o.visible=this.instance.isInViewport,!this.instance.isInViewport&&!e)return;const l=i*1.3+o.random*a,r=o.random*.2+1,u=Math.sin(this.position.x+l*.1+r*31.231)*Math.PI,h=Math.cos(this.position.x+l*.1+r*31.231)*Math.PI,g=n.noise((l*7+this.position.x+we)*.1*r+r,(l*3+this.position.y+we)*.1*r+r)*.6+1,v=ft(this.scale.x,.001,.2),f=g*v;nt.set(f,l*9+u+Math.PI*2,l+h+Math.PI*.5),o.position.setFromSpherical(nt),o.alpha=n.noise(l,o.random+we)*.5+.5,we+=.001})}mount(){var e,n;this.body.enabled=!0,(e=this.glow)==null||e.addToBatcher(),(n=this.glowDense)==null||n.addToBatcher(),this.trails.forEach(t=>{t.alpha=1,t.visible=!0,t.addToBatcher()})}unMount(){var e,n;this.body.enabled=!1,(e=this.glow)==null||e.removeFromBatcher(),(n=this.glowDense)==null||n.removeFromBatcher(),this.trails.forEach(t=>{t.removeFromBatcher()})}reset(){const{position:e,rotation:n,scale:t}=this.collectible;this.body.enabled=!0,this.position.copy(e),this.rotation.setFromVector3(n),this.scale.copy(t),this.trails.forEach(i=>{i.visible=this.visible,i.position.set(0,0,0),i.scale.setScalar(1)})}collided(e){if(!this.body.enabled)return;const{scene:n,$particles:t,playSound:i,rng:o}=c;this.combo.isActive=!0,this.combo.sequence+=1;const a=n.zeppelin.base.position,l=it.copy(this.position).sub(a).normalize(),r=Wn.copy(e).sub(a);l.y+=1,l.normalize(),i("sfx_Pickup_Small_Combo"),c.$game.speedUp(),Y().to(this.scale,{x:.001,y:.001,z:.001,duration:100,onComplete:()=>{this.visible=!1,this.instance.visible=!1}});const u=y.get();u.release(),c.$particles.emit("collectibleBurst",{amount:I.randomInt(9,11),position:this.position,scale:u.set(1,1).setScalar(.003*1),duration:500,opacity:.3,depthTest:!0,sprite:"glow-denser",batcher:"gem_emissive",color:new m(this.primaryColor)}),t.emit("sparkles",{batcher:"gem_emissive",position:r,sprite:"wave-glow",scale:0,scaleTo:.008,alpha:.15,alphaTo:0,duration:.3,parent:n.zeppelin.base}),t.emit("sparkles",{batcher:"gem_emissive",position:r,sprite:"flash",scale:0,scaleTo:.01,alpha:.5,alphaTo:0,duration:.15,parent:n.zeppelin.base}),this.body.enabled=!1,this.trails.forEach((h,g)=>{h.tween&&h.tween.destroy(),h.tween=Y().to(h,{alpha:0,duration:800,onComplete:()=>{h.visible=!1}})}),this.combo.trigger()}get visible(){return this._visible}set visible(e){this._visible=e,this.instance.visible=e,this.glow&&(this.glow.visible=e),this.glowDense&&(this.glowDense.visible=e)}}const Xn=`#define saturate(t) clamp(t, 0., 1.)
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <sd_unevencapsule>
#include <rotateUv>
uniform sampler2D map;
uniform sampler2D alphaMap;
uniform sampler2D tRandom;
uniform sampler2D tNoise;
uniform float lineWidth;
uniform float random;
uniform float time;
uniform float useMap;
uniform float useAlphaMap;
uniform float useDash;
uniform float dashArray;
uniform float dashOffset;
uniform float dashRatio;
uniform float visibility;
uniform float alphaTest;
uniform float trailProgress;
uniform float trailLength;
uniform vec2 repeat;
uniform vec3 color;
uniform float isRay;
varying vec2 vUV;
varying vec4 vColor;
varying float vCounters;
varying vec3 vWorldPosition;
const float fade = 0.1;
const float thickness = 0.01;
const float startPoint = -.5;
float exponentialIn(float t) {
  return t == 0.0 ? t : pow(2.0, 10.0 * (t - 1.0));
}
void main() {
#include <logdepthbuf_fragment>
vec2 uv = vUV - vec2(0., .5);
float aspect = PATH_LENGTH / lineWidth;
uv.x *= aspect;
float start = trailProgress * 2. - 1.;
vec4 c = vColor;
if (useMap == 1.) c *= texture2D(map, vUV * repeat);
if (useAlphaMap == 1.) c.a *= texture2D(alphaMap, vUV * repeat).a;
if (c.a < alphaTest) discard;
if (useDash == 1.) {
c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
}
float offX = texture2D(tNoise, vec2(uv.x + time * 3. + random, 0.) * .03).r * -.03 * isRay;
vec2 startPoint = vec2(start + offX, 0.) * aspect;
vec2 endPoint = vec2(start + trailLength + offX, 0.) * aspect;
float fullLength = smoothstep(endPoint.x + .2, endPoint.x - .5, uv.x);
float off = (texture2D(tNoise, vec2(uv.x + time * 3. + random, 0.) * .03).r - .5) * .3 * fullLength;
float d = sdUnevenCapsule(uv, startPoint, endPoint, -.05, .002);
float d2 = sdUnevenCapsule(uv + vec2(0., off), startPoint, endPoint, -.05, .001);
float thinRay = saturate(.01 / (smoothstep(0., 1.5, d2 * aspect)) - .1) * 1.;
c = vec4(0);
float smoothEndGlow = (smoothstep(.0, .1, trailProgress) - smoothstep(.9, 1., trailProgress)) * .4 * (1. - isRay);
c += vec4(mix(color, vec3(1), 1. - (smoothstep(0., .2, d2 * aspect))), thinRay) * isRay;
c += saturate(.03 / (smoothstep(0., .5, d * aspect)) - .1) * .5 * (1. - isRay);
c += (1. - (smoothstep(0.003, .5 - smoothEndGlow, d))) * .4 * (1. - isRay);
c -= texture2D(tRandom, vWorldPosition.xy * .3).r * .1;
float fadeEnd = .99 - .1 * (1. - isRay);
c.a *= smoothstep(0., 0.1 * aspect, uv.x) - smoothstep(fadeEnd * aspect, 1. * aspect, uv.x);
gl_FragColor = c;
gl_FragColor.a *= step(vCounters, visibility);
#include <fog_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,Yn=P(Xn,"fragmentShader"),Hn=`#include <common>
#include <logdepthbuf_pars_vertex>
#include <fog_pars_vertex>
attribute vec3 previous;
attribute vec3 next;
attribute float side;
attribute float width;
attribute float counters;
uniform vec2 resolution;
uniform float lineWidth;
uniform vec3 color;
uniform float opacity;
uniform float sizeAttenuation;
varying vec2 vUV;
varying vec4 vColor;
varying vec3 vWorldPosition;
varying float vCounters;
vec2 fix(vec4 i, float aspect) {
vec2 res = i.xy / i.w;
res.x *= aspect;
vCounters = counters;
return res;
}
void main() {
float aspect = resolution.x / resolution.y;
vColor = vec4(color, opacity);
vUV = uv;
mat4 m = projectionMatrix * modelViewMatrix;
vec4 finalPosition = m * vec4(position, 1.0);
vec4 prevPos = m * vec4(previous, 1.0);
vec4 nextPos = m * vec4(next, 1.0);
vec2 currentP = fix(finalPosition, aspect);
vec2 prevP = fix(prevPos, aspect);
vec2 nextP = fix(nextPos, aspect);
float w = lineWidth * width;
vec2 dir;
if (nextP == currentP) dir = normalize(currentP - prevP);
else if (prevP == currentP) dir = normalize(nextP - currentP);
else {
vec2 dir1 = normalize(currentP - prevP);
vec2 dir2 = normalize(nextP - currentP);
dir = normalize(dir1 + dir2);
vec2 perp = vec2(-dir1.y, dir1.x);
vec2 miter = vec2(-dir.y, dir.x);
}
vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
normal.xy *= .5 * w;
if (sizeAttenuation == 0.) {
normal.xy *= finalPosition.w;
normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy;
}
finalPosition.xy += normal.xy * side;
gl_Position = finalPosition;
#include <logdepthbuf_vertex>
#include <fog_vertex>
vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
vWorldPosition = finalPosition.xyz;
#include <fog_vertex>
}`,Zn=P(Hn,"vertexShader");class ot extends H{constructor({lineWidth:n=1,color:t=16777215,opacity:i=1,sizeAttenuation:o=1,uniforms:a={},defines:l={},ray:r=!1,...u}={}){super(u);U(this,"name","PathTracerMaterial");this.uniforms={lineWidth:{value:n},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new m(t)},opacity:{value:i},resolution:c.$renderer.drawingBufferSize,sizeAttenuation:{value:o},dashArray:{value:0},time:{value:0},trailProgress:{value:0},trailLength:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},visibility:{value:1},alphaTest:{value:0},random:{value:Math.random()*1e3},repeat:{value:new y(1,1)},isRay:{value:r?1:0},tNoise:{value:c.$assets.textures.perlinNoise},tRandom:{value:c.$assets.textures.blueNoise},...a},this.defines||(this.defines={}),Object.assign(this.defines,{...l}),Yn.use(this),Zn.use(this)}}class jn{constructor(e){this.data=e,this.path=new Bt,this.base=new ie;const n=oe.$device.type.phone,t=new p().fromArray(e.path[0].pos),i=new p().fromArray(e.pos).sub(t);n&&(i.y+=2),this._len=.5,this._progress=0,this._isActive=!1,this._current=0,this.duration=1.2,this.base=new ie;for(let o=0;o<this.data.path.length-1;o++){const a=this.data.path[o],l=this.data.path[o+1],r=new p().fromArray(a.pos).add(i),u=new p().fromArray(l.pos).add(i),h=new p().fromArray(a.out),g=new p().fromArray(l.in);isNaN(h.x)&&h.setScalar(0),isNaN(g.x)&&g.setScalar(0);const v=new Vt(r,h.add(r),g.add(u),u);this.path.add(v)}this.geo=new Qt().setPoints(this.path.getPoints(64)),this.mat=new ot({lineWidth:5,transparent:!0,depthWrite:!1,ray:!0,defines:{PATH_LENGTH:this.path.getLength()}}),this.additiveMat=new ot({lineWidth:5,transparent:!0,depthWrite:!1,blending:Wt,defines:{PATH_LENGTH:this.path.getLength()}}),this.length=this._len,this.progress=this._progress,this.glow=new ee(this.geo,this.additiveMat),this.ray=new ee(this.geo,this.mat),this.base.renderOrder=this.glow.renderOrder=this.ray.renderOrder=c.$store.z.particles,this.base.add(this.ray,this.glow)}reset(){this.progress=0,this._current=0,this._isActive=!1}update(e){this.mat.uniforms.time.value+=e,this.additiveMat.uniforms.time.value+=e,this._isActive&&(this._current+=e,this.progress=this._current/this.duration,this._current>=this.duration&&this.reset())}play(){this._isActive=!0}get progress(){return this._progress}set progress(e){this._progress=e,this.mat.uniforms.trailProgress.value=e,this.additiveMat.uniforms.trailProgress.value=e}get length(){return this._len}set length(e){this._len=e,this.mat.uniforms.trailLength.value=e,this.additiveMat.uniforms.trailLength.value=e}get color(){return this.mat.uniforms.color.value}set color(e){this.mat.uniforms.color.value.set(e),this.additiveMat.uniforms.color.value.set(e)}}const Qn=ge(Ae.inOutSine);class Kn{constructor(e,n){this.data=e,this.pool=n,this.isActive=!1,this.isBroken=!1,this.sequence=-1,this.collectibles=[],this.data.forEach((t,i)=>{const[o]=this.pool.add(),{pos:a,rot:l,body:r,still:u}=t,h=oe.$device.type.phone?2:1,g=i===0,v=g,f=oe.$device.type.phone,w=de(a),S=de(l),M=de((g?.18:.12)*h),F=Oe(r.type===0?r.radius*.5:r.size*.5)??{x:1,y:1};w.z+=.1,f&&(w.y+=2),o.position.copy(w),o.rotation.setFromVector3(S),o.scale.copy(M);const Z=g?Gn:Bn,B=new Re({label:"combo",x:w.x,y:w.y,z:w.z,enabled:v,shape:"circle",width:F.x,height:F.y}),z={index:i,instance:o,body:B,position:w,rotation:S,scale:M,size:F,still:u,magneticEnabled:!0,magnet:new y,tween:null},x=new Z(this,z,B);z.visual=x,x.visible=v,this.collectibles.push(z),this.pool.refresh(!0)}),this.pathTracer=new jn(this.data[0]),this.pool.base.add(this.pathTracer.base),this.reset()}reset(){this.isActive=!1,this.isBroken=!1,this.sequence=-1,this.collectibles.forEach((e,n)=>{const t=n===0,i=t?e.scale:{x:.001,y:.001,z:.001};e.visual.reset(),e.body.enabled=t,e.visual.visible=t,e.instance.position.copy(e.position),e.instance.rotation.setFromVector3(e.rotation),e.instance.scale.copy(i)}),this.pathTracer.reset(),this.update(!0),this.pool.refresh(!0)}setColors(e=16777215,n=16777215){this.pathTracer.color=n,this.primary=e,this.secondary=n,this.collectibles.forEach(({visual:t})=>{var i,o;t.primaryColor=e,t.secondaryColor=n,(i=t.glow)==null||i.color.set(e),(o=t.glowDense)==null||o.color.set(e)})}trigger(){const{$particles:e,playSound:n}=c;this.pathTracer.play(),n("sfx_SmallPickup_Appear_Trail");for(let t=1;t<this.collectibles.length;t++){const i=this.collectibles[t];i.body.enabled=!0,i.visual.visible=!0,i.tween=Y().fromTo(i.instance.scale,{x:.001,y:.001,z:.001},{x:i.scale.x,y:i.scale.y,z:i.scale.z,duration:400,delay:140*t}),e.emit("sparkles",{batcher:"gem_emissive",position:i.position,sprite:"wave",scale:1e-4,scaleTo:.005,duration:.5,delay:.14*t,onProgress:o=>{o.alpha=(Ge(0,.1,o.progress)-Ge(.5,1,o.progress))*.2}})}}mount(){this.collectibles.forEach(e=>{e.visual.mount()})}unmount(){this.collectibles.forEach(e=>{e.visual.unMount()})}update(e){var o;if(c.$game.isPaused())return;const n=c.$time.dt*.001;this.pathTracer.update(n);const{$game:t,$time:i}=c;(o=this.collectibles)==null||o.forEach(({magnet:a,body:l,position:r,instance:u,visual:h,magneticEnabled:g=!0})=>{if(!u.isInViewport)return;const v=0,f=y.get();if(t.currentChapter&&g){const{zeppelin:w}=t.currentChapter,S=r.distanceTo(w.base.position),M=1.8;S<M&&f.copy(r).sub(w.base.position).normalize().multiplyScalar(Qn(M-S)),a.x=k(a.x,f.x,.15,i.dt),a.y=k(a.y,f.y,.15,i.dt),f.release()}Le.Body.setPosition(l.base,{x:r.x+v-a.x,y:r.y-a.y}),u.position.copy(l.base.position),h.visible=u.isInViewport,h.update(e)})}}class Jn extends O{init(){const{$assets:e,$store:n}=this.webgl,{datas:t}=this.props;if(!t)return;const i=t.reduce((l,r)=>l+r.length,0)+1;this.combos=[],this._visible=!0,this.primaryColor=new m,this.secondaryColor=new m;const o=e.geometries.register("sphere",ht,.5),a=this.material=new pt({depthTest:!0,depthWrite:!0,uniforms:{uColorA:{value:new m(16777215)},uColorB:{value:new m(16777215)},uBias:{value:.6},uScale:{value:1},uPower:{value:3}}});this.pool=new Be(o,a,i),this.base=this.pool.base,this.base.renderOrder=n.z.particles;for(let l=0;l<t.length;l++){const r=t[l],u=new Kn(r,this.pool,l);this.combos.push(u)}this.resetHandler=()=>this.combos.forEach(l=>l.reset()),this.pool.refresh(!0),this.webgl.hooks.beforePrerender.watch(()=>{this.base.count=1}),this.webgl.hooks.afterPrerender.watch(()=>{this.base.count=0})}mount(){var n;const{$game:e}=this.webgl;(n=this.combos)==null||n.forEach(t=>{t.reset(),t.mount()}),this.scene.addObject3D(this.base),e.events.reset.watch(this.resetHandler)}unMount(){var n;const{$game:e}=this.webgl;(n=this.combos)==null||n.forEach(t=>{t.unmount()}),this.base.removeFromParent(),e.events.reset.unwatch(this.resetHandler)}update(){var e;this.combos.forEach(n=>n.update()),(e=this.pool)==null||e.refresh(!0)}setColors(e=this.primaryColor,n=this.secondaryColor){this.material.uniforms.uColorA.value.set(e),this.material.uniforms.uColorB.value.set(n),this.combos.forEach(t=>t.setColors(e,n))}get visible(){return this._visible}set visible(e){this._visible=e,this.base.visible=e;const n=e?"mount":"unmount";this.combos.forEach(t=>t[n]())}dispose(){this.pool.dispose()}}class ei extends O{init(){this.base=new ie,this.level=this.props.level;const{collectibles:e,boosts:n,combos:t}=this.level;this.isVisible=!0,this.collectiblesManager=this.add(In,{datas:e}),this.boostsManager=this.add(Rn,{datas:n}),this.combosManager=this.add(Jn,{datas:t})}toggleVisibility(e){e!==this.isVisible&&(this.isVisible=e,this.collectiblesManager.visible=e,this.boostsManager.visible=e,this.combosManager.visible=e)}mount(){this.collectiblesManager.mount(),this.boostsManager.mount(),this.combosManager.mount()}unMount(){this.collectiblesManager.unMount(),this.boostsManager.unMount(),this.combosManager.unMount()}dispose(){this.collectiblesManager.dispose(),this.boostsManager.dispose(),this.combosManager.dispose()}}class ti extends O{init(){const e=c.$store.safeZoneSize||5;this.base=new ie,this.mesh=new ee(new Ce(1,20),new dt({color:65280,transparent:!0,opacity:.5})),this.mesh.scale.x=e/2,this.mesh.visible=!1,this.addObject3D(this.mesh)}beforeInit(){}reset(){this.base.position.x=0}update(){}}const si=`#define pi 3.14159265359
#define tau pi * 2.
#define saturate(t) clamp(t, 0., 1.)
#define BLUR_SAMPLES 10
uniform vec2 res;
uniform float time;
uniform float uProgress;
uniform float uBlurStrength;
uniform vec3 playerPos;
uniform vec2 playerVel;
uniform float playerSpeed;
uniform float layerVelocity;
uniform float thunder;
uniform vec3 uTopColor;
uniform vec3 uBotColor;
uniform vec3 uShadowColor;
uniform sampler2D tScene;
uniform sampler2D tPlayer;
uniform sampler2D tWorley;
uniform sampler2D tCollidables;
uniform sampler2D tBlueNoise;
uniform sampler2D tNoise;
#include <map>
#include <luma>
const vec3 overlayColor = vec3(0.457,0.445,.5) * .3;
vec4 blur( sampler2D image, vec2 uv, float force ){
vec4 color = vec4(0);
float d = 0.;
#pragma unroll_loop_start
for ( int i = 0; i < BLUR_SAMPLES; i ++ ) {
d = tau * (float(i) / float(BLUR_SAMPLES));
color += texture2D(image, uv + vec2(cos(d), sin(d)) * force);
}
#pragma unroll_loop_end
color /= float(BLUR_SAMPLES);
return color;
}
float Cloud(vec2 st, vec2 offset, float timeScale) {
vec3 noise = texture2D(tNoise, st * .1 - vec2(time * .02 * timeScale + uProgress * 0.1, 0.) + offset).rgb;
float fbm = noise.b * .625;
fbm += noise.g * .25;
fbm += noise.r * .125;
fbm = mix(1., fbm, .5);
fbm = abs(fbm * 2. - 1.);
float worley = (texture2D(tWorley, st * 1. - vec2((time * timeScale + uProgress * 3.) * .02, 0.)).b + noise.r) * .625;
worley += (texture2D(tWorley, st * .5 - vec2((time * timeScale * .5 + uProgress * 3.) * .02, 0.)).g + noise.g) * .25;
worley += (texture2D(tWorley, st * .5 - vec2((time * timeScale * .25 + uProgress * 3.) * .02, 0.)).r + noise.b) * .125;
return saturate(remap(fbm, worley - 1., 1., 0., 1.));
}
vec2 scl(in vec2 _st, vec2 scale, vec2 offset) {
vec2 st = _st;
st -= offset;
st *= scale;
st += offset;
return st;
}
vec2 scl(in vec2 _st, vec2 scale) {
return scl(_st, scale, vec2(0.5));
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, s, -s, c);
return m * v;
}
float saturation(vec3 col) {
float l = luma(col);
float mn = min(min(col.r, col.g), col.b);
float mx = max(max(col.r, col.g), col.b);
return (1. - ((mx-mn))) * (1. - mx  * l * 5.);
}
vec3 lightness(vec3 col) {
float l = luma(col);
float mn = min(min(col.r, col.g), col.b);
float mx = max(max(col.r, col.g), col.b);
return vec3((mx + mn) / 2.);
}
vec3 vibrance(vec3 col, float vib) {
float sat = saturation(col);
vec3 lightness = lightness(col);
return mix(col, mix(col, lightness, -sat), vib);
}
float cubicInOut(float t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * pow(2.0 * t - 2.0, 3.0) + 1.0;
}
void main() {
vec2 st = gl_FragCoord.xy / res.xy;
vec2 originalSt = st;
float aspect = res.x / res.y;
vec4 player = texture2D(tPlayer, st);
float mask = sin((smoothstep(-1.5, 2.5, st.x) + uProgress) * pi);
float transitionProgress = cubicInOut(1. - abs(uProgress));
vec3 scene = texture2D(tScene, st).rgb;
vec2 speed = vec2(.01, 0.);
st = scl(st, vec2(aspect, 1.));
float grain = texture2D(tNoise, st * 30.).r;
vec2 transitionDisplacement = vec2(uProgress * .2, playerPos.y * -.2);
vec2 fakeWind = texture2D(tNoise, vec2(time + uProgress, time * .5) * 0.01 + st * 0.01).bg * vec2(1., 0.5) * .4 + .6;
fakeWind += texture2D(tNoise, vec2(time + uProgress, time * .8) * 0.003 + st * 0.01).rg * vec2(1., 0.5) * .5 + .5;
fakeWind /= 2.;
float windForce = length(fakeWind);
float angle = -playerVel.y;
vec2 stVel = st;
stVel -= vec2(.5, .5);
stVel *= 1. - windForce * .1;
stVel += vec2(.5, .5);
stVel = scl(stVel, vec2(layerVelocity, 1.), vec2(1.2, .5));
transitionDisplacement += fakeWind;
float cloud = saturate(Cloud(scl(stVel + transitionDisplacement, vec2(1.)), vec2(fakeWind), -1.));
float cloudShadow = saturate(Cloud(scl(stVel + transitionDisplacement, vec2(.8)), vec2(fakeWind.x * 1.4, fakeWind.y * 1.2), -1.2));
float shadow = smoothstep(0., 1., (cloud - cloudShadow));
mask = saturate(mask + smoothstep(0., 1., cloud * .5 + .5));
mask = smoothstep(0.5, 1., mask);
vec3 color = mix(uBotColor, uTopColor, originalSt.y);
float thunderFactor = (smoothstep(.5, -.2, cloudShadow) * .5 + .5);
vec3 img = color;
img = mix(img, player.rgb, player.a * mask);
img = mix(img, color * uShadowColor, saturate(shadow * mask));
img = mix(img, vec3(1), abs(sin(thunder * pi * .01)) * mask * thunderFactor);
img = mix(img, img * (1. - grain * .2), mask);
gl_FragColor = vec4(img, mask * transitionProgress);
}`,ni=P(si,"fragmentShader"),ii=`void main() {
gl_Position = vec4(position, 1.0);
}`,oi=P(ii,"vertexShader");class ai extends H{constructor({uniforms:n={},...t}){super(t);U(this,"name","VeilMaterial");this.uniforms={...n},ni.use(this),oi.use(this)}}const ri=`#define STANDARD
attribute float instanceIndex;
attribute float instanceResistance;
attribute float instanceRandomX;
attribute float instanceRandomY;
uniform float uTime;
uniform float uCount;
uniform float uSize;
uniform float uWeight;
uniform float uForce;
uniform float uCycle;
uniform float uDuration;
uniform float uFalling;
uniform float uMinScale;
uniform float uMaxScale;
uniform vec2 uWind;
uniform float uIsFrozen;
uniform sampler2D tNoise;
varying float vProgress;
varying float vDistance;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
vec3 rotate( vec3 position, float angle ){
float x = position.x * cos(angle) - position.y * sin(angle);
float y = position.y * cos(angle) + position.x * sin(angle);
return vec3(x, y, position.z);
}
float getCycle( float position, float axis, float progress, float halfScreen ){
return clamp(
(position - mix(halfScreen, 0.0, uCycle * 4.0) + axis + mix(0.0, halfScreen, progress)) / (halfScreen * 2.0),
0.0,
1.0
);
}
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
float duration = uDuration * 1.5;
float elapsedTime = uTime - (instanceIndex * 1.0);
vProgress = mod(uTime * 4. + instanceIndex * 2938.253, PI * 2. * duration) / (PI * 2. * duration);
float n = texture2D(tNoise, vec2(instanceRandomX + (elapsedTime + instanceResistance * 15.) * .01, instanceRandomY + (elapsedTime + instanceResistance * 1545.) * .03) * 0.003).r * 2. - 1.;
n *= (sin(elapsedTime) * .5 + .5) * .01;
float ampli = mix(0.002, 0.0003, uIsFrozen);
float oscillating = cos(abs(elapsedTime / 2000.0) * instanceResistance * PI) * duration * ampli;
vec2 wind = (uWind);
wind.x += (oscillating * 0.1 - n) * (1. - uIsFrozen);
transformed.x *= mix(0.5, 1.0, uIsFrozen);
transformed.y *= mix(3.0, 1.0, uIsFrozen);
transformed.xy *= uWeight;
float angle = atan(wind.x, wind.y);
transformed = rotate(transformed, angle);
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;
float halfScreen = gl_Position.z + uSize;
vDistance = abs(instanceResistance);
float displacementX = mix(-halfScreen, halfScreen, instanceRandomX) + halfScreen;
float displacementY = mix(-halfScreen, halfScreen, instanceRandomY) - halfScreen;
displacementX += -wind.x / abs(wind.x) * halfScreen;
displacementX += oscillating * wind.y;
displacementY += oscillating * wind.x;
displacementX += mix(0.0, wind.x * halfScreen * 2.0, vProgress);
displacementY += halfScreen - (vProgress * halfScreen * 2.0) * wind.y;
float displacementZ = mix(uMinScale, uMaxScale, vDistance);
displacementZ *= round(((smoothstep(.0, .5, uForce) - smoothstep(.5, 1., uForce)) * instanceIndex) / uCount);
vec2 noise = texture2D(tNoise, vec2(displacementX + displacementY + instanceRandomX + instanceRandomY, uTime * .001 + instanceIndex * 154.) * 0.003).bg * 2. * (1. - uIsFrozen);
gl_Position.xy *= displacementZ;
gl_Position.x += displacementX + oscillating * .1 + noise.x;
gl_Position.y += displacementY + noise.y;
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition = worldPosition.xyz;
#endif
}`,li=P(ri,"vertexShader"),ci=`uniform sampler2D uSnowTexture;
uniform float uIsFrozen;
uniform vec3 uColor;
varying vec2 vUv;
varying float vProgress;
varying float vDistance;
void main() {
float snow = texture2D(uSnowTexture, vUv).a;
float rain = 1.0 - (abs(vUv.x * 2.0 - 1.0) * abs(vUv.y * 2.0 - 1.0));
float alpha = mix(rain, snow, uIsFrozen);
alpha *= mix(0.1, 1.0, vDistance);
alpha *= 1.0 - abs(vProgress * 2.0 - 1.0);
vec3 color = uColor;
gl_FragColor = vec4(color, alpha);
}`,ui=P(ci,"fragmentShader");class hi extends H{constructor({count:n,size:t,duration:i,minScale:o,maxScale:a,force:l=1,weight:r=.5,wind:u=new y,frozen:h=1}){super({transparent:!0,depthTest:!1,depthWrite:!1});U(this,"name","WeatherMaterial");this.uniforms={...ut.merge([ve.common]),uSnowTexture:{value:c.$assets.textures.snow},uTime:{value:0},uCount:{value:n},uSize:{value:t},uForce:{value:l},uWeight:{value:r},uFalling:{value:0},uOscillating:{value:new y},uDuration:{value:i*1e3},uMinScale:{value:o},uMaxScale:{value:a},uWind:{value:u},uIsFrozen:{value:h},uColor:{value:new m},tNoise:{value:c.$assets.textures.perlinNoise}},this.defines={USE_UV:!0},li.use(this),ui.use(this)}}const se=1e3,Ie=.2;new y;class fi extends O{init(){const{duration:e=.5,randomResitance:n=1,minScale:t=.05,maxScale:i=.3,wind:o=new y(-.3,.53),force:a=0,weight:l=0}=this.props,{$store:r}=this.webgl;this.base=new Ne(new Ce(Ie,Ie),new hi({duration:e,minScale:t,maxScale:i,wind:o,force:a,weight:l,count:se,size:Ie,frozen:0}),se),this.base.frustumCulled=!1,this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.base.renderOrder=r.z.clouds,this.duration=1,this.durationOffset=0,this.timeOffset=0,this.iceFactor=0,this.position=this.base.position,this.base.geometry.setAttribute("instanceIndex",new q(new Float32Array(se).map((u,h)=>h),1)),this.base.geometry.setAttribute("instanceRandomX",new q(new Float32Array(se).map(()=>qe(Math.random(),0,1,-1,1)),1)),this.base.geometry.setAttribute("instanceRandomY",new q(new Float32Array(se).map(()=>Math.random()),1)),this.base.geometry.setAttribute("instanceResistance",new q(new Float32Array(se).map(()=>Math.random()*n),1)),this.base.updateMatrix(),this.base.updateMatrixWorld(!0),this.webgl.hooks.beforePrerender.watch(()=>{this.base.count=1,this.force=.5,this.update()}),this.webgl.hooks.afterPrerender.watch(()=>{this.base.count=se,this.force=0,this.update()})}update(){if(this.webgl.$game.isPaused())return;const e=!(this.force===1||this.force===0);this.base.visible=e,e&&(this.position.copy(this.scene.camera.base.position),this.position.z-=5,this.base.material.uniforms.uTime.value+=this.webgl.$time.dt+this.timeOffset,this.base.material.uniforms.uIsFrozen.value=d(0,1,this.iceFactor),this.base.material.uniforms.uDuration.value=d(150,2e3,this.iceFactor)*this.duration+this.durationOffset,this.base.material.uniforms.uWeight.value=d(0,d(1,2,this.iceFactor),this.force),this.base.updateMatrix(),this.base.updateMatrixWorld(!0))}get force(){return this.base.material.uniforms.uForce.value}set force(e){this.base.material.uniforms.uForce.value=e,this.base.material.uniforms.uWeight.value=e}get color(){return this.base.material.uniforms.uColor.value}set color(e){const n=typeof e=="number"?"set":"copy";this.base.material.uniforms.uColor.value[n](e)}get wind(){return this.base.material.uniforms.uWind.value}set wind(e){this.base.material.uniforms.uWind.value.copy(e)}dispose(){this.base.dispose(),this.base.geometry.dispose(),this.base.material.dispose()}}const di=`varying vec2 vUv;
varying float vProgress;
uniform float uAlpha;
varying float vAlpha;
const float smoothness = .2;
void main() {
float alpha = (smoothstep(0., smoothness, vUv.x) - smoothstep(1. - smoothness, 1., vUv.x)) * uAlpha;
float alphaProgressStart = smoothstep(0., .2, vProgress - 1. + vUv.x) * smoothstep(0.3, .4, vProgress);
float alphaProgressEnd = smoothstep(0.8, 1., vProgress) * smoothstep(0.7, .8, vProgress);
float alphaProgress = alphaProgressStart - alphaProgressEnd;
gl_FragColor = vec4(vec3(1), alpha * alphaProgress * vAlpha);
}`,mi=P(di,"fragmentShader"),pi=`#define PI 3.14159265359
attribute float aSpine;
attribute float aRand;
attribute float aAngle;
attribute float aAlpha;
attribute vec3 aSpawn;
attribute float aProgress;
attribute float aMaxProgress;
attribute float aTwist;
uniform sampler2D tNoise;
uniform float time;
varying vec2 vUv;
varying float vProgress;
varying float vAlpha;
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, s, -s, c);
return m * v;
}
mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}
const float freq = 4.;
void main() {
vProgress = aProgress / aMaxProgress;
vAlpha = aAlpha;
vec4 transformed = vec4(position, 1.0);
vec3 parentTransform = (modelMatrix * vec4(vec3(0.), 1.0)).xyz;
transformed.y *= .1;
transformed.x *= 4. + aRand * 6.;
transformed *= 1. + aRand * .5;
vUv = uv;
float t = time * 2.5 * (1. + aRand);
float amplitude = .1 * (aRand * .2 - 1.);
vec3 worldPos = (modelMatrix * instanceMatrix * transformed).xyz;
vec2 noise = (texture2D(tNoise, (worldPos.xy) * .1).bg * .5 - .5) * PI;
transformed.y += sin((aSpine * freq * .5 - t + aRand * 523.15)) * amplitude;
transformed.xyz = (rotation3d(vec3(0., 0., -1.), sin((aSpine * freq - t + aRand * 523.15)) * amplitude) * transformed).xyz;
transformed.xyz += vec3(
cos(aSpine * PI - t * .5) * cos(aSpine * PI - t * .5) * 4.,
sin(aSpine * PI - t * .5) * cos(aSpine * PI - t * .5) * 2.,
sin(aSpine * PI - t * .5) * 1.
) * aTwist;
transformed.x -= aMaxProgress;
transformed.x += mix(aMaxProgress * (-1. * (aRand * 2. + 1.)), aMaxProgress * (1. * (aRand * 2. + 1.)), vProgress);
gl_Position = projectionMatrix * viewMatrix * instanceMatrix * transformed;
}`,vi=P(pi,"vertexShader");class gi extends H{constructor({uniforms:n={},...t}={}){super(t);U(this,"name","WindMaterial");this.uniforms={...n},this.side=Gt,this.forceSinglePass=!0,mi.use(this),vi.use(this)}}const ke=20,bi=128,_e=new p,at=new y,rt=new ct;class yi extends O{init(){this.createMaterial(),this.base=new Ne(new Ce(1,1,bi,1),this.material,ke),this.base.frustumCulled=!1,this.base.renderOrder=this.webgl.$store.z.clouds,this.localPosition=new p(0,0,-10),this.base.count=0,this._alpha=1,this.particles=Array(ke).fill().map(()=>({progress:0,isDead:!0,maxProgress:0,speed:1,rand:0,alpha:0,twist:0,spawnPosition:new p})),this.aliveParticles=[],this.createWindInstances()}createWindInstances(){const{rng:e}=this.webgl.$game,n=this.base.geometry,{position:t}=n.attributes,i=[],o=[],a=[],l=[];for(let r=0;r<t.count;r++)_e.fromBufferAttribute(t,r),at.set(_e.y,0).normalize(),i.push(Math.atan2(at.y,0)),o.push(_e.x+.5);for(let r=0;r<ke;r++)a.push(0),l.push(e.randomFloat(0,1));n.setAttribute("aSpine",new Ue(o,1)),n.setAttribute("aAngle",new Ue(i,1)),n.setAttribute("aProgress",new q(new Float32Array(a),1)),n.setAttribute("aMaxProgress",new q(new Float32Array(a),1)),n.setAttribute("aTwist",new q(new Float32Array(a),1)),n.setAttribute("aAlpha",new q(new Float32Array(a),1)),n.setAttribute("aRand",new q(new Float32Array(l),1))}createMaterial(){this.material=new gi({depthTest:!1,depthWrite:!1,transparent:!0,uniforms:{uAlpha:{value:.5},time:{value:0},tNoise:{value:this.webgl.$assets.textures.perlinNoise}}})}emit(e){const{rng:n}=this.webgl.$game,t=this.base.getWorldPosition(_e),i=[];this.particles.forEach((o,a)=>{i.length>=e||o.isDead&&i.push(o)});for(let o=0;o<i.length;o++){const a=i[o],l=t.x+n.randomFloat(5,10),r=t.y+n.randomFloat(-10,10),u=t.z+n.randomFloat(-10,0);a.spawnPosition.set(l,r,u),a.progress=n.randomFloat(8,14),a.speed=n.randomFloat(1,3),a.alpha=n.randomFloat(.2,.6),a.rand=n.randomFloat(0,1),a.twist=n.randomFloat(0,1)<.1?1:0,a.maxProgress=a.progress,a.isDead=!1}}update(){if(this.webgl.$game.isPaused())return;const{aProgress:e,aRand:n,aMaxProgress:t,aAlpha:i,aTwist:o}=this.base.geometry.attributes,a=this.webgl.$time.dt*.001,l=this.scene.getCurrentCamera().base;this.base.position.copy(l.position).add(this.localPosition),this.base.updateMatrix(),this.aliveParticles.length=0,this.material.uniforms.time.value+=a,this.particles.forEach((r,u)=>{r.progress-=a*r.speed,r.isDead=r.progress<=0,r.isDead||this.aliveParticles.push(r)});for(let r=0;r<this.aliveParticles.length;r++){const u=this.aliveParticles[r];rt.setPosition(u.spawnPosition),this.base.setMatrixAt(r,rt),t.setX(r,u.maxProgress),o.setX(r,u.twist),e.setX(r,u.progress),i.setX(r,u.alpha),n.setX(r,u.rand)}this.base.count=this.aliveParticles.length,this.base.instanceMatrix.needsUpdate=!0,n.needsUpdate=!0,i.needsUpdate=!0,e.needsUpdate=!0,t.needsUpdate=!0,o.needsUpdate=!0}clear(){this.aliveParticles.forEach(e=>{e.progress=Math.max(e.progress,2)})}get alpha(){return this.material.uniforms.uAlpha.value}set alpha(e){this.material.uniforms.uAlpha.value=e}dispose(){this.base.dispose(),this.base.geometry.dispose(),this.base.material.dispose()}}const xi=new y,wi=3.1,_i=.5;let Pe=0;const Pi=Math.random()*3543,Fe={value:0};new y(.5,.5);const lt=new y;class Si extends O{init(){const{$renderer:e,$game:n,$assets:t,$store:i}=this.webgl;this.isActive=!1,this.progress=b(-1),this.blurStrength=b(.01),this.shouldRender=!1,this._thunderAmount={value:0},this.hasThunder=!1,this.base=new ie,this.plane=new ee(mt,new ai({transparent:!0,depthWrite:!1,depthTest:!1,uniforms:{time:{value:0},res:e.drawingBufferSize,uProgress:this.progress,uBlurStrength:this.blurStrength,tScene:n.sceneTexture,tPlayer:n.playerTexture,tCollidables:n.collidableTexture,tWorley:{value:t.textures.worleyNoise},tNoise:{value:t.textures.perlinNoise},tBlueNoise:{value:t.textures.blueNoise},layerVelocity:{value:0},playerPos:{value:new y},playerVel:{value:new y},playerSpeed:{value:0},thunder:{value:0},uTopColor:{value:new m(9341850)},uBotColor:{value:new m(14196856)},uShadowColor:{value:new m(9341850)}}})),this.windDirection=new y(-.3,.53),this.baseWindDirection=this.windDirection.clone(),this.plane.frustumCulled=!1,this.plane.matrixAutoUpdate=!1,this.plane.manualMatrixUpdate=!0,this.plane.renderOrder=i.z.storm,this.base.add(this.plane),this.weather=this.add(fi,{wind:this.windDirection}),this.wind=this.add(yi),this.webgl.hooks.beforePrerender.watch(()=>{this.progress.value=-.4,this.update()}),this.webgl.hooks.afterPrerender.watch(()=>{this.progress.value=-1,this.update()})}afterInit(){this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.base.updateWorldMatrix(!1,!0)}setWeather({iceFactor:e=this.weather.iceFactor,rainColor:n=this.weather.color}={}){this.weather.iceFactor=e,this.weather.color=n}setColors({topColor:e=this.plane.material.uniforms.uTopColor.value,botColor:n=this.plane.material.uniforms.uBotColor.value,shadowColor:t=this.plane.material.uniforms.uShadowColor.value}={}){this.plane.material.uniforms.uTopColor.value.set(e),this.plane.material.uniforms.uBotColor.value.set(n),this.plane.material.uniforms.uShadowColor.value.set(t)}update(){const e=this.progress.value>-1&&this.progress.value<1,n=1-Math.abs(this.progress.value),{$game:t,$time:i,zeppelin:o}=this.webgl,{currentChapter:a}=this.webgl.$game,{playerPos:l,playerVel:r,playerSpeed:u,time:h,thunder:g}=this.plane.material.uniforms;if(t.isPaused()||(Pe+=.001,t.skipRenderEnvironment=this.progress.value===0,t.stormProgressUniform.value=n,!a))return;const v=i.dt*.001,f=t.noise(i.elapsed*.001,Pe)*.1;if(lt.copy(this.baseWindDirection).rotateAround(xi,f).sub(this.windDirection),this.windDirection.addScaledVector(lt,.5),this.weather.timeOffset=t.noise(i.elapsed*6e-4,Pe*.1)*20+20,u.value=d(u.value,0,.01),h.value+=v*a.speed*2,this.plane.visible=e,t.isStormy=e,this.shouldRender=e,this.thunderAmount-=_i*v,this.hasThunder&&e&&this.isActive&&Math.random()<.008&&this.wind.emit(Math.floor(Math.random()*2)+1),!e||!this.hasThunder)return;const w=Math.pow(this.thunderAmount,wi);g.value=Math.abs(1e4*w*t.noise(Pi*2,Pe)),!this.isTransitioning&&Math.random()<.001&&this.thunder(Math.random()*.1+.2)}destroy(){var e;(e=this.progressTween)==null||e.destroy(),super.destroy()}toggleStorm(e,n){if(this.isActive===e)return;const{$store:t,playSound:i,stopSound:o}=this.webgl,{width:a}=this.webgl.$viewport.size.get(),l=fe(a,375,1440,.5,.5),r=fe(a,375,1440,.3,.6),u=this.weather.iceFactor<.5;t.camera.game.zoomOut=e?1:0,t.camera.game.lerp=e?.006:.002,t.camera.game.shakeAmount=e?r:0,t.camera.game.shakeFreq=e?.2:1,t.camera.game.shakeAmpl=e?l:1,i(e?"sfx_Storm_Appear":"sfx_Storm_Disappear"),u?e?i("sfx_Storm_StrongRain_Loop",{loop:!0}):o("sfx_Storm_StrongRain_Loop"):e?i("sfx_Storm_StrongWind_Loop",{loop:!0}):o("sfx_Storm_StrongWind_Loop"),this.isActive=e,this.isTransitioning=!0;const g=e?-1:0,v=e?0:1,f=e?8e3:3e3,w=e?7500:2800;this.progressTween&&this.progressTween.destroy(),this.fooTween&&this.fooTween.destroy();let S=this.wind.alpha;e&&(this.wind.alpha=.5,this.wind.emit(Math.floor(Math.random()*4)+3),this.webgl.$quality.pause()),this.progressTween=Y().fromTo(this.progress,{value:g},{value:v,duration:n?1:f,easing:e?"outCubic":"inCubic",onProgress:()=>{this.weather.force=this.progress.value*.5+.5},onComplete:()=>{this.isTransitioning=!1,e||this.webgl.$quality.resume()}}),this.fooTween=Y().fromTo(Fe,{value:0},{value:1,duration:n?1:w,easing:e?"outCirc":"inCirc",onProgress:()=>{const M=Math.sin(Fe.value*Math.PI);e||(this.wind.alpha=(1-Fe.value)*S),this.plane.material.uniforms.layerVelocity.value=1-M*.2}})}thunder(e){this.thunderAmount+=e}dispose(){this.plane.geometry.dispose(),this.plane.material.dispose(),this.weather.dispose(),this.wind.dispose()}get thunderAmount(){return this._thunderAmount.value}set thunderAmount(e){this._thunderAmount.value=Se(e,0,.5)}}new y;const Mi=new p;class Ti extends O{init(){const{name:e}=this.props,n=this.scene.getCurrentCamera().base;this.maxDistance=30,this.minDistance=10,this.lerp=1,this.basePosition=new p(10,0,-7.5),this.bounds=0,this.offX=0,this.offY=0,this.isOver=!1,this.startPos=0,this.scale=new y(.01,.01),this.subtitleVisible=!1,this.subtitleTimer=null,this.instance=new E({batcher:"titles",id:e,scale:this.scale,position:this.basePosition,alpha:1,fx:0}),this.instance.position.copy(this.basePosition).add(n.position),this.resetHandler=()=>this.reset()}reset(){this.isOver=!1,this.instance.visible=!0,this.instance.fx=0,this.instance.alpha=0,this.stop()}mount(){this.isOver=!1,this.instance.visible=!0,this.instance.addToBatcher(),this.webgl.$game.events.reset.watch(this.resetHandler)}unMount(){this.isOver=!0,this.instance.visible=!1,this.instance.removeFromBatcher(),this.webgl.$game.events.reset.unwatch(this.resetHandler)}stop(){clearTimeout(this.subtitleTimer),this.subtitleVisible=!1,this.webgl.$app.$store.displaySubtitle=!1}update(){if(this.webgl.$game.isPaused())return;if(this.isOver){this.instance.visible=!1;return}const e=this.scene.getCurrentCamera().base,{progress:n}=this.scene,{$store:t}=this.webgl.$app;this.instance.scale.copy(this.scale),this.isOver=n>100+this.startPos;const i=this.webgl.$time.stableDt*.001,o=ft(n-this.basePosition.x,-25+this.startPos,10+this.startPos),a=Mi.copy(this.basePosition).add(e.position).sub(this.instance.position);a.x+=this.startPos,this.instance.position.x=d(this.instance.position.x,a.x-i*1.2,.5),this.instance.position.y=d(this.instance.position.y,e.position.y,1);const l=ge(Ae.inOutCubic)(o);this.instance.alpha=o,this.instance.fx=l,!(o<=.5)&&(this.subtitleVisible||(this.subtitleVisible=!0,clearTimeout(this.subtitleTimer),t.displaySubtitle=!0,this.subtitleTimer=setTimeout(()=>{t.displaySubtitle=!1},7500)))}get visible(){return this.instance.visible}set visible(e){this.instance.visible=e}}class Ii extends Kt{constructor(){super(...arguments);U(this,"name","baselevel")}get mixins(){return["debugCamera"]}beforeInit(){this.isActive=!1,this.progress=0,this.progressNormalized=0,this.timeScale=_(b(1.2),this.name+"_timescale"),this.cameraOffset=b(0),this.color=16777215,this.zeppelin=this.webgl.$game.player=this.add(Jt),this.speed=1,this.targetSpeed=1,this.baseTargetSpeed=1,this.camera=this.add(Tn),this.prerenderPlane=new ee(this.webgl.$assets.geometries.register("plane",Ce),new dt({color:16777215})),this.prerenderPlane.scale.setScalar(5),this.prerenderPlane.position.z=5,this.prerenderPlane.position.y=3,this.addObject3D(this.prerenderPlane),this.prerenderTextures=[],this.currentScore=0,this.fog=this.base.fog=new Xt,this.fogColor=_(b(16766920),this.name+"_fogColor"),this.fogDensity=_(b(.0058),this.name+"_fogDensity"),this.fogColor.watchImmediate(n=>this.fog.color.set(n)),this.fogDensity.watchImmediate(n=>this.fog.density=n),this.safeZone=this.add(ti),this.lut=this.webgl.$assets.textures.lut}afterInit(){this.level&&(this.storm=this.add(Si,{camera:this.camera}),this.ld=this.add(ei,{level:this.level}),this.temple=this.add(es),this.temple.addTo(this),this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.title=this.add(Ti,{name:this.level.name}))}triggerIn(){var a;if(this.isActive)return;const{$game:n,playSound:t,$app:i,$store:o}=this.webgl;n.currentChapter=this,this.level.tutoLimit&&(o.game.tuto.limits.min=this.level.tutoLimit.min,o.game.tuto.limits.max=this.level.tutoLimit.max),this.isActive=!0,this.currentScore=i.$store.totalScore,this.mount(),this.sunColor=((a=this.lights)==null?void 0:a.sunColor)||b(16777215),this.in(),this.log(">>> TRIGGER IN"),n.hooks.afterLevelStarted.emit(this)}mount(){var n,t;this.level&&(this.level.mount(),this.zeppelin.onMounted(),(n=this.title)==null||n.mount(),(t=this.ld)==null||t.mount())}triggerOut(){var n,t,i;this.webgl.$game.currentChapter=null,this.log(">>> TRIGGER out"),this.isActive=!1,this.level&&((n=this.title)==null||n.unMount(),this.level.unMount(),this.zeppelin.onUnMounted(),(t=this.ld)==null||t.unMount()),(i=this.storm)==null||i.toggleStorm(!1,!0),this.out(),this.webgl.$particles.reset(),this.dispose()}in(){}out(){}generateLevel(){}beforeUpdate(){const{dt:n}=this.webgl.$time;this.speed=k(this.speed,this.targetSpeed*this.timeScale.value,1,n),Math.random()<.002&&this.emitWind(Math.floor(Math.random()*2)+1),this.environment}reset(){this.progress=0}emitWind(n){var t;(t=this.wind)==null||t.emit(n)}dispose(){this.children.forEach(n=>{"dispose"in n&&n.dispose()})}static getLoadArray(n,t,i={}){const{load:o}=c.$assets;return n in c.$app.$baluchon.manifest?Object.keys(c.$app.$baluchon.manifest[n].files).map(a=>{const l=a.slice(0,a.lastIndexOf("."));return o(n+"/"+l,{id:t+"/"+l,flipY:!1,...i})}):[]}}export{Di as A,Ii as B,$i as C,Ei as E,pe as S,Ts as a};
