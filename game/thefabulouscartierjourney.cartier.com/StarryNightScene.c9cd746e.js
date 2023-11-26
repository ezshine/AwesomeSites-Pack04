var he=Object.defineProperty;var de=(g,t,e)=>t in g?he(g,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):g[t]=e;var R=(g,t,e)=>(de(g,typeof t!="symbol"?t+"":t,e),e);import{al as b,bz as k,bD as B,ao as _,a$ as O,b5 as se,bG as w,c2 as me,c3 as fe,aQ as f,bi as ue,bj as pe,bn as ne,by as ie,bc as ge,be as ve,ca as ae,bg as xe,bl as _e,b6 as ye,b3 as be,cb as re,ap as oe,aa as C,b7 as S,bA as we,aR as Me,aY as Ce,c4 as Se,c5 as Pe}from"./vendors/vendors.a233fc08.js";import{B as j,h as A,i as h,S as Te,E,T as De,b as $e,g as Ae,L as Re,a as U}from"./app.0ebd139a.js";import{E as Ee,S as ke,a as Fe,B as $,A as ze,C as Le}from"./BaseLevel.3cf717b5.js";import{G as Ie,T as Ne}from"./TextMaterial.a6b46cf7.js";import"./experience.js";class Ue extends j{init(){const{$game:t}=this.webgl;this.webgl.$store.camBoundaries;const{color:e=b(2630467)}=this.props;this.base=new k(this.webgl.$assets.geometries.register("plane",B),new Ie({color:new _(e.value),fog:!0,uniforms:{uCityCenter:{value:this.scene.environment.center}}})),this.base.rotation.x=Math.PI/-2,this.base.renderToDepthPrepass=!0,this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.position=this.base.position,this.position.y=-5.6,this.base.material.onBeforeCompile=s=>{Object.assign(s.uniforms,{...O.fog})},this.updateScale(),t.hooks.beforeDepthPass.watch(this.beforeDepthPass,this),t.hooks.afterDepthPass.watch(this.afterDepthPass,this)}beforeDepthPass(){this.base.renderOrder=990}afterDepthPass(){this.base.renderOrder=-1}destroy(){const{$game:t}=this.webgl;t.hooks.beforeDepthPass.unwatch(this.beforeDepthPass,this),t.hooks.afterDepthPass.unwatch(this.afterDepthPass,this),super.destroy()}update(){const t=this.scene.camera.cam;this.base.position.x=t.position.x,this.base.updateMatrix(),this.base.updateMatrixWorld(!0)}updateScale(){const{horizontal:t,vertical:e}=this.webgl.$store.camBoundaries,s=(t.value.y-t.value.x)*1e3,n=(e.value.y-e.value.x)*100;this.base.scale.set(s,n,1),this.base.updateMatrix(),this.base.updateMatrixWorld(!0)}dispose(){this.base.geometry.dispose(),this.base.material.dispose()}}class Be extends j{init(){const{$store:t}=this.webgl;this.base=new se,this.alColor=w(b(1390415),"sn_alColor"),this.alIntensity=w(b(1.1),"sn_alIntensity"),this.dlColor=w(b(21898),"sn_dlColor"),this.dlIntensity=w(b(.5),"sn_dlIntensity"),this.moonColor=w(b(12894463),"sn_moonColor"),this.moonIntensity=w(b(.6),"sn_moonIntensity"),this.moonDistance=w(b(0),"sn_moonDistance"),this.moonDecay=w(b(2),"sn_moonDecay"),this.al=new me(this.alColor.get(),this.alIntensity.get()),this.al.layers.enable(t.layers.PLAYER),this.moon=new fe(this.moonColor.get(),this.moonIntensity.get(),this.moonDistance.get()),this.moonPosition=w(b(new f(290,340,70)),"sn_moonPosition"),this.moon.position.copy(this.moonPosition.get()),this.moon.layers.enable(t.layers.PLAYER),this.moon.matrixAutoUpdate=!1,this.moon.manualMatrixUpdate=!0,this.moon.updateMatrix(),this.base.add(this.al,this.moon)}update(){const t=this.scene.camera.cam;this.moon.position.copy(this.moonPosition.value),this.moon.position.x+=t.position.x,this.moon.updateMatrix(),this.moon.updateMatrixWorld(!0)}}const Oe=`#define STANDARD
attribute vec4 uvAtlasOffset;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying float vElevation;
#include <common>
#include <map>
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
vElevation = transformed.y;
vWorldPosition = worldPosition.xyz;
}`,je=A(Oe,"vertexShader"),We=`#define STANDARD
#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
uniform float time;
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
varying vec3 vWorldPosition;
varying float vElevation;
#include <common>
#include <map>
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
#ifdef USE_EMISSIVEMAP
vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
totalEmissiveRadiance *= emissiveColor.rgb;
#endif
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
gl_FragColor.rgb = mix(gl_FragColor.rgb, fogTextureColor, smoothstep(0.6, 1., fogFactor) );
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,Ye=A(We,"fragmentShader");class Ve extends ue{constructor({uniforms:t={},defines:e={},...s}={}){super(s),this.type="StandardMaterial",this.color=new _(9801655),this.uniforms={...pe.standard.uniforms,...O.fog,...t},this.defines||(this.defines={}),Object.assign(this.defines,e),je.use(this),Ye.use(this)}}const He=`uniform vec3 color;
uniform vec2 res;
uniform float time;
uniform sampler2D fbtText;
uniform sampler2D tNoise;
uniform sampler2D tRandom;
varying vec2 vUv;
varying vec3 vPos;
varying float vRand;
varying float vDistance;
#include <easings>
const vec3 blue = vec3(0.227,0.529,0.812);
const vec3 green = vec3(0.38,0.776,0.863);
const vec3 red = vec3(1, 0, 0);
const vec3 yellow = vec3(0.937,0.745,0.243);
const float MAX_DIST = 600.;
void main() {
vec2 st = gl_FragCoord.xy / res.xy;
float grain = (texture2D(tRandom, vec2(vPos.xy) * .1).b * 2. - 1.) * .5;
float offNoiseR = texture2D(tNoise, vec2(vRand * 853.123, time * 0.001) * .001).r * 2. - 1.;
float offNoise = texture2D(tNoise, vec2(vRand * 283.123 + vPos.x + offNoiseR, time * 0.002) * .01).r * .01;
float smoothY = 1. - exp(-vUv.y * 1.2 + offNoise * 30.);
float noise = texture2D(tNoise, vec2(vPos.x * .001 + vRand * 253., .0) * 10.).r * (1. - smoothY);
float noiseB = texture2D(tNoise, vec2(vPos.x * .06 + vRand * 23., .0) * 1.).b * smoothY;
float noiseC = texture2D(tNoise, vec2(vPos.x * .06 + vRand * 23., time * 0.00003) * 1.5).g * .2 + smoothstep(.0, .3, smoothY) * .1;
float globalNoise = texture2D(tNoise, vec2(vPos.x * .1 + time * 0.001, vPos.y * 2.1) * 20.).b * .2;
float alphaFactor = smoothstep(0.3, 0.5, max(0., vUv.y)) - smoothstep(0.5, .8, max(0., vUv.y));
alphaFactor *= smoothstep(0., 0.2, vUv.x) - smoothstep(0.8, 1., vUv.x);
alphaFactor *= noise - noiseB + noiseC;
float alpha = alphaFactor;
alpha = max(0., alpha - globalNoise);
vec3 finalColor = mix(color, green, smoothstep(.1, .8, alpha));
finalColor = mix(finalColor, yellow * .2 + green * .03 + red * .03, smoothstep(0.15, 0.35, globalNoise + offNoiseR));
alpha *= alpha;
alpha -= vDistance * .0006;
gl_FragColor = vec4(finalColor, alpha);
gl_FragColor.a -= grain;
gl_FragColor.a -= .02;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,Ge=A(He,"fragmentShader"),Qe=`varying vec2 vUv;
varying vec3 vPos;
attribute float aRand;
varying float vRand;
varying float vDistance;
void main() {
vUv = uv;
vRand = aRand;
vec3 transformed = position.xyz;
transformed.x *= 5. * (1. + vRand * 2.);
transformed.y *= .8 + aRand * .5;
transformed.z += sin(transformed.x * 2.) * 5.;
vPos = (modelMatrix * instanceMatrix * vec4(transformed, 1.)).xyz;
vec3 origin = (modelMatrix * vec4(vec3(0), 1.)).xyz;
vDistance = distance(vPos, origin);
gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(transformed, 1.);
}`,Xe=A(Qe,"vertexShader");class Ze extends ne{constructor({color:e=16777215,uniforms:s={},defines:n={},...a}){super({depthWrite:!1,...a});R(this,"name","SkyLightsMaterial");this.blending=ie,this.uniforms={...s,time:h.uniforms.time,color:{value:new _(e)},tNoise:{value:h.$assets.textures.perlinNoise},tRandom:{value:h.$assets.textures.dirtyNoise},res:h.$renderer.drawingBufferSize},this.defines||(this.defines={}),Object.assign(this.defines,n),Ge.use(this),Xe.use(this)}}const V=new f,qe=new f,H=new ye,Ke=new be,Je=["triomphe","eiffel"];class et extends Ee{createEnvironment(){const{scene:t,texturePrefix:e,emptyAreas:s}=this.props,{rng:n,$store:a}=this.webgl,l=this.webgl.threeRenderer;this.texturesRef=Object.entries(this.webgl.$assets.textures).reduce((o,[i,u])=>{if(i.startsWith(e)){const[,m,d]=i.split("/");o[d]||(o[d]={}),l.initTexture(u),o[d][m]=u}return o},{}),this.halos=[],this.materials=new Map,this.meshes=new Map;const r=[];this.fc=this.webgl.$game.fc,this.cityMaterial=null,this.center=new f,this.size=new f,this.originCenter=new f;const c=new ge;t.traverse(o=>{if(o.name.includes("halo")){const i=Math.random(),u=Math.random(),m=i<.5,d=new Te({batcher:"city",sprite:m?"glow":"flash",position:o.position,color:m?new _(16764757).offsetHSL(Math.random()*.05-.05,0,0):16751701,alpha:m?.5:.3,fx:i,fx2:u,scale:m?n.randomFloat(.0012,.0032):n.randomFloat(.001,.003)});this.halos.push(d);return}if(o.isMesh){const i=o.geometry.clone();i.deleteAttribute("tangent");const u=o.material.name.toLowerCase(),{center:m}=o.geometry.boundingSphere,d=o.geometry.boundingBox.max;i.name=u,i.translate(-m.x,-m.y,-m.z);const P=u.includes("neighborhood");P&&(i.name="neighborhood",c.expandByPoint(m));const{albedo:T=null,normal:F=null,metallic:z=null,roughness:W=null,emissive:L=null}=this.texturesRef[i.name]??{},Y=L?new _(16768853):new _(0);let D=null;if(this.materials.has(i.name))D=this.materials.get(i.name);else{if(this.cityMaterial&&P)D=this.cityMaterial;else if(!this.cityMaterial&&P)D=this.cityMaterial={name:i.name,roughness:.5,emissive:Y,emissiveIntensity:4,flatShading:!0,...this.defaultMaterialParams,map:T,normalMap:F,metalnessMap:z,roughnessMap:W,emissiveMap:L};else{const M={...this.defaultMaterialParams},le=Je.some(ce=>i.name.includes(ce))?3:.5;s&&(M.defines=Object.assign({},M.defines),M.defines.USE_EMPTY_AREAS="",M.uniforms=Object.assign({},M.uniforms),M.uniforms.tEmptyAreas={value:s.texture},M.uniforms.uEmptyAreasTransform={value:s.transform}),D={name:i.name,emissive:Y,emissiveIntensity:le,...M,map:T,normalMap:F,metalnessMap:z,roughnessMap:W,emissiveMap:L}}this.materials.set(i.name,D)}r.push({position:m.clone(),sortPos:d.clone(),geometry:i,materialParams:D})}}),r.sort((o,i)=>i.sortPos.z-o.sortPos.z),c.getCenter(this.center),c.getSize(this.size),this.originCenter.copy(this.center),this.radius=this.size.length(),r.forEach(({geometry:o,position:i})=>{const u=this.materials.get(o.name);let m=null;u.material?m=u.material:(m=new Ve(u),u.material=m);const d=new k(o,m);d.position.copy(i),d.renderToDepthPrepass=!0,d.matrixAutoUpdate=!1,d.manualMatrixUpdate=!0,d.updateMatrix(),this.base.add(d),this.webgl.hooks.beforePrerender.watch(()=>{d.position.set(0,0,0),d.updateMatrix(),d.updateMatrixWorld(!0)}),this.webgl.hooks.afterPrerender.watch(()=>{d.position.copy(i),d.updateMatrix(),d.updateMatrixWorld(!0)})}),new k(new ve,new ae({color:"red"})).position.copy(this.center),this.webgl.$renderer.drawingBufferSize;const p=new xe(new B(10,10,8),new Ze({color:3968730}),5);p.geometry.translate(0,.5,0),p.position.copy(this.center),p.renderOrder=a.z.environment;const x=[];for(let o=0;o<10;o++){V.set(n.randomFloat(-50,50),2.8,n.randomFloat(-10,60));const i=qe.setScalar(1);i.y=n.randomFloat(3,5),H.compose(V,Ke,i),p.setMatrixAt(o,H),x.push(n.randomFloat(0,1))}p.geometry.setAttribute("aRand",new _e(new Float32Array(x),1)),p.instanceMatrix.needsUpdate=!0,this.base.add(p),this.base.updateMatrix(),this.base.updateMatrixWorld(!0)}update(){this.visible&&(this.scene.getCurrentCamera().base,this.center.copy(this.originCenter).applyMatrix4(this.base.matrixWorld),this.base.visible=this.parent.prerendered)}get visible(){return this.base.visible}set visible(t){this.base.visible=t}}const tt=`precision highp float;
attribute vec4 texCoords;
attribute vec4 meshCoords;
uniform float time;
attribute vec3 spritePos;
attribute vec4 spriteQt;
attribute vec4 spriteColor;
attribute vec2 decorators;
uniform vec3 lightPosition;
varying vec2 vUv;
varying vec4 vColor;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vLightDistance;
varying vec2 vDecorators;
#include <fog_pars_vertex>
#include <get_instance_matrix>
#include <ascendfog_pars_vertex>
#include <envmap_pars_vertex>
void main() {
vec4 zero = vec4(0., 0., 0., 1.);
vColor = spriteColor;
vUv = uv * texCoords.zw + texCoords.xy;
float t = time * .5;
vDecorators = decorators;
vColor.a *= sin(t * 0.006 + decorators.x * 6532.) * decorators.y * .5 + 1.5;
vec3 transformed = position;
transformed.xy = transformed.xy * meshCoords.zw + (meshCoords.xy * 0.5);
transformed.xy += meshCoords.xy * 0.5;
transformed *= 1. + sin(t * .006 + decorators.y * 1512. + tan(t * .001 + decorators.x * 21.) * .03) * .06;
mat4 instanceMatrix = getInstanceMatrix(spritePos, spriteQt, vec3(1.) );
vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(transformed, 1.);
vec4 bbPosition = modelViewMatrix * instanceMatrix * zero;
bbPosition.x += cos(spriteQt.x) * transformed.x - sin(spriteQt.x) * transformed.y;
bbPosition.y += sin(spriteQt.x) * transformed.x + cos(spriteQt.x) * transformed.y;
bbPosition.z += smoothstep(0.0, .5, decorators.y) * .3;
mvPosition = bbPosition;
vWorldPosition = (mvPosition).xyz;
vLightDistance = distance(lightPosition, bbPosition.xyz - (modelViewMatrix * zero).xyz);
gl_Position = projectionMatrix * mvPosition;
#ifdef USE_ASCEND_FOG
vec4 objsetPos = instanceMatrix * vec4( transformed, 1.0 );
objsetPos = modelMatrix * objsetPos;
vObjectPosition = objsetPos.xyz;
vObjectNormal = vec3(modelMatrix * vec4(normal, 0.0));
#endif
#include <fog_vertex>
vNormal = vec3(0, 0, 1);
}`,st=A(tt,"vertexShader"),nt=`precision highp float;
uniform sampler2D atlas;
uniform sampler2D tDepth;
uniform sampler2D tPlayer;
uniform vec3 lightColor;
uniform vec3 color;
varying vec2 vUv;
varying vec4 vColor;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vLightDistance;
varying vec2 vDecorators;
uniform vec2 res;
uniform float zNear;
uniform float zFar;
uniform float depthTransition;
uniform float density;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <fog_pars_fragment>
#include <ascendfog_pars_fragment>
#include <luma>
#include <rgbhsv>
float calc_depth(float z) {
float near = 1.;
float far = 200.;
return (2.0 * near) / (far + near - z * (far - near));
}
void main() {
vec2 uv = vUv;
vec4 diffuseColor = texture2D(atlas, uv);
vec2 st = gl_FragCoord.xy / res;
vec4 depth = texture2D(tDepth, st);
float geometryZ = calc_depth(unpackRGBAToDepth(depth));
float sceneZ = calc_depth(gl_FragCoord.z);
float depthDiff = saturate(geometryZ - sceneZ + (1. - depth.a));
float softAlpha = smoothstep(0.0, 0.06, depthDiff);
float alpha = diffuseColor.a * vColor.a;
vec3 col = vColor.rgb;
col = rgb2hsv(col);
col.r += (vDecorators.x * 2. - 1.) * 0.015;
col = hsv2rgb(col);
gl_FragColor = vec4(col, alpha);
if (gl_FragColor.a <= 0.0001) discard;
vec3 normal = vec3(0., 0., 1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <ascendfog_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,it=A(nt,"fragmentShader");class at extends ne{constructor({count:e,atlas:s,renderOrder:n,useAlphaSDF:a,blending:l,uniforms:r={},defines:c={},...v}){super(v);R(this,"name","CitySpriteMaterial");this.blending=ie,this.uniforms={...r,...O.fog,atlas:{value:s.texture,type:"t"},res:h.$renderer.drawingBufferSize},this.defines={USE_ALPHA_SDF:!!a,...c},this.fog=!0,this.transparent=!0,r.envMap&&(this.defines.USE_ENVMAP=""),st.use(this),it.use(this)}}const G=new re,Q=new f,X=new f;new oe;let I=[];class Z extends ke{constructor(){super(...arguments);R(this,"isSkyNight",!0)}init(){super.init();const{$game:e,$renderer:s}=this.webgl;this.fogDirection=new f,this.cityCenter=new f,this.base.renderOrder=-1,Object.assign(this.material.uniforms,{uFogDirection:{value:this.fogDirection},uLightColor:{value:new _(16764757)}}),this.noStarsMaterial=new Fe({uniforms:{...this.material.uniforms},defines:{...this.material.defines,SKIP_STARS:""}}),e.hooks.beforeBgPass.watch(this.beforeBgPass,this),e.hooks.afterBgPass.watch(this.afterBgPass,this)}beforeBgPass(){this.base.material=this.noStarsMaterial}afterBgPass(){this.base.material=this.material}destroy(){this.webgl.$game.hooks.beforeBgPass.unwatch(this.beforeBgPass),this.webgl.$game.hooks.afterBgPass.unwatch(this.afterBgPass),super.destroy()}update(){super.update(),I.length=0,Math.random()<.001&&this.triggerShootingStar();const e=this.scene.getCurrentCamera().base;if(!e)return;const s=this.scene.environment.center;Q.copy(e.position),X.copy(s).sub(e.position).normalize(),G.set(Q,X);const[{point:n}={}]=G.intersectObject(this.base,!1,I)??I;this.fogDirection.copy(s).sub(n).normalize()}dispose(){super.dispose(),this.noStarsMaterial.dispose()}}class rt{constructor(t){this.name=t,this.center=new f,this.centerProjected=new oe,this.time={value:0},this.speed=1,this.radius={value:1},this.uniforms={townTime:this.time,townRadius:this.radius,townCenter:{value:this.center},townCenterProjected:{value:this.centerProjected},tNoise:{value:h.$assets.textures.perlinNoise}},this.defines={USE_TOWN_FOG:""}}update(t){this.time.value+=t*this.speed}}const q=new _("black"),ot=new f,lt=new f;new f;const ct=4,y=.1,K=20;class ht{constructor(){this.pos=new f,this.prevPos=new f,this.vel=new f,this.isActive=!1}update(t){if(!this.isActive)return;this.pos.copy(t),this.vel.subVectors(this.pos,this.prevPos);const e=Math.min(K,this.vel.length()*15),s=Math.max(3,e)/K,n=ot.copy(this.vel).normalize();if(C.randomFloat()<.8)for(let a=0;a<Math.floor(ct*s);a++){const l=lt.copy(t);l.x+=C.randomFloat(-y,y),l.y+=C.randomFloat(-y,y),l.z+=C.randomFloat(-y,y),l.lerp(this.prevPos,C.randomFloat()),n.x+=C.randomFloat(-y,y),n.y+=C.randomFloat(-y,y),n.z+=C.randomFloat(-y,y),n.normalize(),h.$particles.emit("sparkles",{amount:1,batcher:"fireworksTrail",sprite:"wind_strip_blur_b",position:l,thickness:.06,spread:Math.PI*.3,color:16751968,direction:n,velocity:e*1.5,velocityRandom:.8,duration:1,damping:.93,durationRandom:1,trailDamping:60,hueVariation:.1,onProgress:r=>{const c=r.progress,v=Math.sin(c*Math.PI),p=h.noise(Math.floor(r.position.x*.8),Math.floor(r.position.y*.2+r.index*139.1069)),x=h.noise(Math.floor(r.position.x*.3),Math.floor(r.position.y*.6+r.index*533.15)),o=S(0,.1,c)-S(.8,.95,c);r.velocity.x+=p*v*3,r.velocity.y+=x*v*3,r.alpha=o}}),h.$particles.emit("sparkles",{amount:1,batcher:"fireworksTrail",sprite:"wind",position:l,thickness:.3,spread:Math.PI*.3,color:16751968,direction:n,velocity:e*1.5,velocityRandom:.8,hueVariation:.1,duration:1,damping:.93,durationRandom:1,trailDamping:40,onProgress:r=>{const c=r.progress,v=Math.sin(c*Math.PI),p=h.noise(Math.floor(r.position.x*.8),Math.floor(r.position.y*.2+r.index*139.1069)),x=h.noise(Math.floor(r.position.x*.3),Math.floor(r.position.y*.6+r.index*533.15)),o=S(0,.1,c)-S(.8,.95,c);r.velocity.x+=p*v*3,r.velocity.y+=x*v*3,r.alpha=o*1}})}this.prevPos.lerp(t,.9)}click(t,e){this.isActive&&(h.$particles.emit("sparkles",{amount:1,batcher:"fireworks",sprite:"flash",position:t,colorFrom:e,colorTo:q,duration:.15,scale:0,scaleTo:.02,alphaTo:0}),h.$particles.emit("sparkles",{amount:1,batcher:"fireworks",sprite:"wave-glow",position:t,colorFrom:e,colorTo:q,duration:.25,scale:0,scaleTo:.011,alpha:.3}),h.$particles.emit("sparkles",{amount:5,batcher:"fireworksTrail",sprite:"wind_strip_blur_b",position:t,thickness:.06,spread:Math.PI*2,color:e,velocity:15,velocityRandom:.5,duration:1.4,durationRandom:.5,damping:.95,trailDamping:100,trailLength:.1,hueVariation:.1,onProgress:s=>{const n=s.progress,a=Math.sin(n*Math.PI),l=h.noise(Math.floor(s.position.x*.8),Math.floor(s.position.y*.2+s.index*139.1069)),r=h.noise(Math.floor(s.position.x*.3),Math.floor(s.position.y*.6+s.index*533.15)),c=S(.05,.1,n)-S(.9,1,n);s.velocity.x+=l*a*.8,s.velocity.y+=r*a*.8,s.trailLength=(a*.8+.2)*.2,s.alpha=c}}),h.$particles.emit("sparkles",{amount:5,batcher:"fireworksTrail",sprite:"wind",position:t,thickness:.3,spread:Math.PI*2,color:e,velocity:30,velocityRandom:1,hueVariation:.1,duration:1.6,damping:.96,durationRandom:.5,trailDamping:80,onProgress:s=>{const n=s.progress,a=Math.sin(n*Math.PI),l=h.noise(Math.floor(s.position.x*.8),Math.floor(s.position.y*.2+s.index*139.1069)),r=h.noise(Math.floor(s.position.x*.3),Math.floor(s.position.y*.6+s.index*533.15)),c=S(.05,.1,n)-S(.8,1,n);s.velocity.x+=l*a*1,s.velocity.y+=r*a*1,s.alpha=c}}))}toggle(t){this.isActive=t}}const J=new re,ee=new f(0,0,-40);new f;const dt=new De;let N=!0;const mt=175,te=[new _(16761133),new _(16741687),new _(3922873),new _(15794198),new _(1332991)];class ft extends j{init(){const{$game:t,$assets:e}=this.webgl;this.intersects=[],this.RT=this.webgl.$fbo.createBuffer({name:"fireworks",scale:.2}),this.lighterCursor=new ht,this.S=new we,this._isActive=!1,t.fireworksTexture.value=this.RT.texture,this.plane=new k(e.geometries.get("plane"),new ae),this.plane.scale.setScalar(1e3),this.plane.position.copy(ee),this.plane.visible=!1,this.resetHandler=()=>this.reset()}mount(){const{$particles:t}=this.webgl;this.isActive=!1,t.addTo(this.S,["fake_lights"]),t.addTo(this.scene.base,["fireworks","fireworksTrail"]),this.scene.addObject3D(this.plane),E.start(),this.webgl.$game.events.reset.watch(this.resetHandler)}unMount(){const{$particles:t}=this.webgl;this.isActive=!1,t.removeFromParent(["fake_lights","fireworks","fireworksTrail"]),this.plane.removeFromParent(),this.lighterCursor.toggle(!1),E.stop(),this.webgl.$game.events.reset.unwatch(this.resetHandler)}reset(){E.reset()}update(){if(!this.isActive||this.webgl.transitionScene.time>0)return;const t=this.scene.getCurrentCamera().base,{normalizePos:e,clickIn:s}=this.webgl.$app.$controls.touch;this.plane.position.copy(ee).applyMatrix4(t.matrix),J.setFromCamera(e,t),this.intersects.length=0;const[{point:n}={}]=J.intersectObject(this.plane,!1,this.intersects);if(n&&this.lighterCursor.update(n),n&&s){const a=te[this.webgl.rng.randomInt(0,te.length-1)];N&&E.emit(n,void 0,a),N=!1,E.resetTimer(),this.lighterCursor.click(n,a),dt.start(()=>{N=!0},mt)}this.render()}render(){const t=this.webgl.threeRenderer,e=this.webgl.scene.getCurrentCamera(),s=t.getRenderTarget();t.setRenderTarget(this.RT),t.clear(),t.render(this.S,e.base),t.setRenderTarget(s)}get isActive(){return this._isActive}set isActive(t){this._isActive=t,document.body.style.cursor=t?"pointer":null}}new f;const ut={congratulations:U.$l("WIN-title")};class bt extends ${constructor(){super(...arguments);R(this,"name","starry_night")}static async load(){const{load:e}=h.$assets;await Promise.all([e("starry_night/dataset",{id:"sn_dataset"}),e("starry_night/env",{id:"sn_env"}),e("starry_night/empty_areas",{id:"sn_empty_areas"}),e("starry_night/lut",{id:"sn_lut",data:!0,flipY:!1,linear:!0}),e("starry_night/lut-storm",{id:"sn_lutstorm",data:!0,flipY:!1,linear:!0}),e("sprites-city",{id:"city",linear:!0,srgb:!1}),...$.getLoadArray("starry_night/textures/albedo","sn_env/albedo",{data:!0}),...$.getLoadArray("starry_night/textures/roughness","sn_env/roughness",{data:!0}),...$.getLoadArray("starry_night/textures/normal","sn_env/normal",{data:!0}),...$.getLoadArray("starry_night/textures/metallic","sn_env/metallic",{data:!0}),...$.getLoadArray("starry_night/textures/emissive","sn_env/emissive",{data:!0,flipY:!1})])}beforeInit(){const{$particles:e,$assets:s,$store:n,$game:a}=this.webgl,l=e;l.registerBatcher("fireworks",{atlas:s.spritesheets.gems,blending:"additive",depthTest:!0,count:2e3,renderOrder:n.z.environment}),l.registerBatcher("fireworksTrail",{atlas:h.$assets.spritesheets.trailWind,trails:!0,blending:"additive",depthTest:!0,count:2e3,renderOrder:n.z.environment,material:$e,uniforms:{tDepth:a.depthPrepass}}),super.beforeInit()}init(){const{$assets:e,$particles:s,$game:n,$renderer:a,$store:l}=this.webgl;this.fogExp=this.fog,this.fogDensity.set(.0054),this.fogColor.set(2517405),this.fog.near=70,this.fog.far=250,this.color=2188182,this.isAfterStorm=b(!1),this.lut=h.$assets.textures.sn_lut,this.lutStorm=h.$assets.textures.sn_lutstorm,this.town=new rt(this.name,this.name),this.ascendFog=new ze(this.name,{color:2630467,density:3.8,offset:-3.7,frequency:.0012,amplitude:2.17,speed:2,lacunarity:3,gain:.47}),this.textures=[],this.createTextures(),this.congratulationsText=new k(new B,new Ne({map:this.textures.congratulations,uniforms:{progress:{value:0}}})),this.congratulationsTextParent=new se,this.congratulationsText.scale.setScalar(1),this.congratulationsText.position.z=-30,this.congratulationsTextParent.add(this.congratulationsText),this.addObject3D(this.congratulationsTextParent),s.registerBatcher("city",{count:5e3,atlas:e.spritesheets.city,material:at,renderOrder:l.z.environment,depthTest:!0,uniforms:{tDepth:n.depthPrepass,res:a.drawingBufferSize,time:this.webgl.uniforms.time},defines:{}}),this.reset(),this.generateLevel(),n.events.reset.watch(()=>{this.isAfterStorm.set(!1)}),this.isAfterStorm.watchImmediate(r=>{}),this.fireworks=this.add(ft)}afterInit(){var e,s;super.afterInit(),this.sky=this.add(Z,{current:"night",layer:Z.NIGHT,color:this.ascendFog.color.value,uniforms:this.town.uniforms,defines:this.town.defines}),this.ground=this.add(Ue,{color:this.ascendFog.color,town:this.town}),this.storm&&(this.storm.setColors({topColor:533566,botColor:2188182}),this.storm.hasThunder=!0,this.storm.setWeather({rainColor:7246033})),(e=this.ld.collectiblesManager)==null||e.setColors(16505738,16505738),(s=this.ld.combosManager)==null||s.setColors(4815040,4815040)}destroy(){const{$particles:e,$game:s}=this.webgl;e.removeFromParent(["city","gem_emissive","smoke","gem_normal","trail","titles","wind"]),super.destroy()}in(){var n;const{$particles:e,$game:s}=this.webgl;e.addTo(this.base,["city","gem_emissive","smoke","gem_normal","trail","titles","wind"]),s.registerBackground=!0,this.zeppelin.materials.Ballon.emissive.set(0),this.zeppelin.materials.Ballon.envMapIntensity=1,this.zeppelin.materials.Ring.emissive.set(7105111),this.zeppelin.materials.Temple.emissive.set(0),this.zeppelin.materials.Temple.color.set(16777215),this.isAfterStorm.set(!1),this.temple.templeMaterial.emissiveIntensity=1,this.temple.strokes.material.color.set(4013122),this.temple.strokes.material.aoColor.set(4013122),(n=this.fireworks)==null||n.mount()}out(){var e;this.webgl,this.webgl.$game.registerBackground=!1,(e=this.fireworks)==null||e.unMount()}update(){var p;const{$game:e}=this.webgl,s=this.webgl.$time.dt*.001,n=this.environment.center,a=this.clouds.clouds.position,l=this.clouds.lightPosition.value,r=this.clouds.lightIntensity;this.town.center.copy(n),this.town.centerProjected.copy(e.utils.worldToScreen(n)),this.town.radius.value=this.environment.radius,l.x=n.x-a.x,l.y=n.y-a.y,l.z=n.z-a.z,r.value=Me(l.x,100,50,.5,.4);let v=2*Math.tan(Ce(this.camera.base.fov)/2)*30*this.camera.base.aspect;this.congratulationsText.scale.setScalar(v*.9),(p=this.town)==null||p.update(s),this.ascendFog.update(s)}generateLevel(){var i;const{$assets:e,$game:s,$particles:n,$renderer:a,$app:l}=this.webgl,{bgm:r}=l.$audio;this.lights=this.add(Be);const c=(i=e.data.sn_dataset)!=null&&i.empty_area?{texture:e.textures.sn_empty_areas,transform:[...e.data.sn_dataset.empty_area.pos,...Ae(e.data.sn_dataset.empty_area.size)]}:null;this.clouds=this.add(Le,{noiseFrequency:.3,noiseAmplitude:3.5,windSpeed:.05,scales:{x:8,y:10},offsetY:-5.4,density:16,layers:12,repartition:60,ascendFog:this.ascendFog,name:"Starry Cloud",lightIntensity:.5217391304,color:3355495,lightColor:5868283,emptyAreas:c,town:this.town}),this.lanterns=this.add(Re,{ascendFog:this.ascendFog}),this.environment=this.add(et,{lightmapScale:e.data.sn_dataset.lightmap_scale,scene:e.objects.sn_env.scene,atlas:e.spritesheets.sn_sprites_terrain,ascendFog:this.ascendFog,texturePrefix:"sn_env",emptyAreas:c,town:this.town});const{atlas:v,res:p,...x}=this.clouds.material.uniforms,o=n.batchers.city;Object.assign(o.base.material.defines,this.clouds.material.defines),Object.assign(o.base.material.uniforms,{res:a.drawingBufferSize,...x}),this.level=s.levels.create(this.name,{scene:this,data:e.data.sn_dataset}),this.level.stormy.watch(u=>{this.storm.toggleStorm(u),this.isAfterStorm.set(!u),r.toggle("sn_storm",u,{force:!0})})}dispose(){const{$particles:e}=this.webgl,{sn_empty_areas:s,sn_lut:n,sn_lutstorm:a}=this.webgl.$assets.textures;[s,n,a].forEach(l=>l==null?void 0:l.dispose()),e.dispose(["city"]),e.removeFromParent(["city"]),super.dispose()}createTextures(){const{textColor:e="#ffffff",shadowBlur:s=20,shadowColor:n="rgba(0, 0, 0, .3)"}=this.props,a=this.webgl.$renderer.pixelRatio.get();U.$device.type.mobile;const l=U.$store.isRTL,r=1.2,c=1024*a,v=70*a;Object.entries(ut).forEach(([p,x])=>{x=new String(x||"").toUpperCase().toString();const o=document.createElement("canvas");o.width=c*a,o.height=c*a,o.style.width=`${c/a}px`,o.style.height=`${c/a}px`;const i=o.getContext("2d");i.textAlign="center",i.direction=l?"rtl":"ltr",i.textBaseline="bottom",i.font=`${v}px BrilliantCutPro, Times News Roman, serif`,i.shadowBlur=s*a,i.shadowColor=n,i.scale(a,a);const u=new Se(x,{br:/<br\/?>/,nbsp:/&nbsp;/,shy:/&shy;/,zwsp:/&ZeroWidthSpace;/,measure:T=>(i.textAlign="center",i.shadowBlur=s*a,i.shadowColor=n,i.direction=l?"rtl":"ltr",i.textBaseline="bottom",i.font=`${v}px BrilliantCutPro, Times News Roman, serif`,i.measureText(T).width)}),{lines:m}=u.wrap(o.width/a);i.fillStyle=`${e}`;const d=o.height/(2*a)-v*r*(m.length*.5);m.forEach((T,F)=>{const z=(F+1)*v*r;i.textAlign="center",i.textBaseline="bottom",i.fillText(T.value,o.width/(2*a),z+d)});const P=new Pe(o);this.prerenderTextures.push(P),this.textures[p]=P}),this.arrayTextures=Object.values(this.textures)}}export{bt as default};
