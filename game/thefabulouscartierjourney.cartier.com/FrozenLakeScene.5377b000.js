var j=Object.defineProperty;var H=(f,t,e)=>t in f?j(f,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):f[t]=e;var E=(f,t,e)=>(H(f,typeof t!="symbol"?t+"":t,e),e);import{bi as Y,a$ as k,bj as V,bz as R,bx as G,c6 as q,aQ as v,b6 as L,bM as I,ae as Q,c7 as J,bD as O,bG as o,al as n,c8 as K,bf as X,b5 as Z,c2 as ee,c3 as te,c9 as se}from"./vendors/vendors.a233fc08.js";import{h as $,i as y,B as U,g as ae,H as ie}from"./app.0ebd139a.js";import{B as C,A as ne,S as z,C as re,E as oe}from"./BaseLevel.3cf717b5.js";import"./experience.js";const le=`#define STANDARD
#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform sampler2D distortionMap;
uniform float distortion;
uniform float cameraNear;
uniform float cameraFar;
uniform float mirror;
uniform float minDepthThreshold;
uniform float maxDepthThreshold;
uniform float mixContrast;
uniform float depthScale;
varying vec4 vProjUv;
uniform vec2 res;
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
float distortionFactor = 0.0;
#ifdef USE_DISTORTION
distortionFactor = texture2D(distortionMap, vUv).r * distortion;
#endif
vec4 new_vUv = vProjUv;
new_vUv.x += distortionFactor;
new_vUv.y += distortionFactor;
vec4 base = texture2DProj(tDiffuse, new_vUv);
vec4 merge = base;
#ifdef USE_NORMALMAP
vec2 normal_uv = vec2(0.0);
vec4 normalColor = texture2D(normalMap, vUv * normalScale);
vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
vec3 coord = new_vUv.xyz / new_vUv.w;
normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
vec4 base_normal = texture2D(tDiffuse, normal_uv);
merge = base_normal;
#endif
float depthFactor = 0.0001;
#ifdef USE_DEPTH
vec2 st = gl_FragCoord.xy / res.xy;
vec4 depth = texture2D(tDepth, st);
float _depth = unpackRGBAToDepth(depth);
depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(_depth * depth.a));
depthFactor *= depthScale;
depthFactor = max(0.0001, min(1.0, depthFactor));
merge = merge * depthFactor;
#endif
float reflectorRoughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
reflectorRoughnessFactor *= reflectorTexelRoughness.g;
#endif
vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;
diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * 1.);
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
}`,he=$(le,"fragmentShader"),ce=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
uniform mat4 textureMatrix;
varying vec4 vProjUv;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <ascendfog_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
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
#include <project_vertex>
vProjUv = textureMatrix * vec4( transformed, 1.0 );
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition = - mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <ascendfog_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition = worldPosition.xyz;
#endif
}`,de=$(ce,"vertexShader");class ue extends Y{constructor(e={}){super();E(this,"name","ReflectorMaterial");this._tDepth={value:null},this._distortionMap={value:null},this._tDiffuse={value:null},this._textureMatrix={value:null},this._mirror={value:0},this._minDepthThreshold={value:.9},this._maxDepthThreshold={value:1},this._depthScale={value:0},this._distortion={value:1},this._mixContrast={value:1},this.uniforms={...k.fog,...V.standard.uniforms,res:y.$renderer.drawingBufferSize},this.defines||(this.defines={}),this.defines.USE_REFLECTOR="",this.fog=!0,de.use(this),he.use(this),this.type="StandardMaterial",this.setValues(e)}onBeforeCompile(e){var s;(s=e.defines)!=null&&s.USE_UV||(e.defines.USE_UV=""),this._tDepth.value&&(e.defines.USE_DEPTH=""),this._distortionMap.value&&(e.defines.USE_DISTORTION=""),e.uniforms.tDiffuse=this._tDiffuse,e.uniforms.tDepth=this._tDepth,e.uniforms.distortionMap=this._distortionMap,e.uniforms.textureMatrix=this._textureMatrix,e.uniforms.mirror=this._mirror,e.uniforms.minDepthThreshold=this._minDepthThreshold,e.uniforms.maxDepthThreshold=this._maxDepthThreshold,e.uniforms.depthScale=this._depthScale,e.uniforms.distortion=this._distortion,e.uniforms.mixContrast=this._mixContrast}get tDiffuse(){return this._tDiffuse.value}set tDiffuse(e){this._tDiffuse.value=e}get tDepth(){return this._tDepth.value}set tDepth(e){this._tDepth.value&&(this.defines.USE_DEPTH=""),this._tDepth.value=e}get distortionMap(){return this._distortionMap.value}set distortionMap(e){this._distortionMap.value&&(this.defines.USE_DISTORTION=""),this._distortionMap.value=e}get textureMatrix(){return this._textureMatrix.value}set textureMatrix(e){this._textureMatrix.value=e}get mirror(){return this._mirror.value}set mirror(e){this._mirror.value=e}get minDepthThreshold(){return this._minDepthThreshold.value}set minDepthThreshold(e){this._minDepthThreshold.value=e}get maxDepthThreshold(){return this._maxDepthThreshold.value}set maxDepthThreshold(e){this._maxDepthThreshold.value=e}get depthScale(){return this._depthScale.value}set depthScale(e){this._depthScale.value=e}get distortion(){return this._distortion.value}set distortion(e){this._distortion.value=e}get mixContrast(){return this._mixContrast.value}set mixContrast(e){this._mixContrast.value=e}}class fe extends R{constructor(t,e={}){super(t),this.isReflector=!0,this.type="Reflector",this.camera=new G;const s=this,l=e.textureWidth??512,p=e.textureHeight??512;this.clipBias=e.clipBias??0;const x=e.multisample??4,c=new q,r=new v,h=new v,b=new v,_=new L,d=new v(0,0,-1),a=new I,g=new v,P=new v,M=new I,D=new L,u=this.camera,T=new Q(l,p,{samples:x}),S=new ue;e.ascendFog&&(Object.assign(S.uniforms,{...e.ascendFog.uniforms}),Object.assign(S.defines,{...e.ascendFog.defines})),S.tDiffuse=T.texture,S.tDepth=e.depthTexture??null,S.textureMatrix=D,this.material=S,this.onBeforeRender=function(i,N,w){if(y.$game.hooks.beforeReflectPass.emit(),h.setFromMatrixPosition(s.matrixWorld),b.setFromMatrixPosition(w.matrixWorld),_.extractRotation(s.matrixWorld),r.set(0,0,1),r.applyMatrix4(_),g.subVectors(h,b),g.dot(r)>0)return;g.reflect(r).negate(),g.add(h),_.extractRotation(w.matrixWorld),d.set(0,0,-1),d.applyMatrix4(_),d.add(b),P.subVectors(h,d),P.reflect(r).negate(),P.add(h),u.position.copy(g),u.up.set(0,1,0),u.up.applyMatrix4(_),u.up.reflect(r),u.lookAt(P),u.far=w.far,u.updateMatrixWorld(),u.projectionMatrix.copy(w.projectionMatrix),D.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),D.multiply(u.projectionMatrix),D.multiply(u.matrixWorldInverse),D.multiply(s.matrixWorld),c.setFromNormalAndCoplanarPoint(r,h),c.applyMatrix4(u.matrixWorldInverse),a.set(c.normal.x,c.normal.y,c.normal.z,c.constant);const m=u.projectionMatrix;M.x=(Math.sign(a.x)+m.elements[8])/m.elements[0],M.y=(Math.sign(a.y)+m.elements[9])/m.elements[5],M.z=-1,M.w=(1+m.elements[10])/m.elements[14],a.multiplyScalar(2/a.dot(M)),m.elements[2]=a.x,m.elements[6]=a.y,m.elements[10]=a.z+1-this.clipBias,m.elements[14]=a.w,s.visible=!1;const B=i.getRenderTarget(),W=i.toneMapping;let A=!1;"outputColorSpace"in i&&(A=i.outputColorSpace==="srgb"),"outputColorSpace"in i&&(i.outputColorSpace=""),i.toneMapping=J,i.setRenderTarget(T),i.state.buffers.depth.setMask(!0),i.autoClear===!1&&i.clear(),i.render(N,u),i.toneMapping=W,"outputColorSpace"in i&&(i.outputColorSpace=A?"srgb":""),i.setRenderTarget(B);const F=w.viewport;F!==void 0&&i.state.viewport(F),s.visible=!0,y.$game.hooks.afterReflectPass.emit()},this.getRenderTarget=function(){return T},this.dispose=function(){T.dispose(),s.material.dispose()}}}new v;class me extends U{init(){const{ascendFog:t,emptyAreas:e}=this.props,{$assets:s,$game:l,$particles:p}=this.webgl,{fl_lake_map:x,fl_lake_roughness:c,fl_lake_normal:r}=s.textures,h=s.geometries.register("plane",O);s.objects.fl_extras.scene.traverse(a=>{a.isMesh&&a.name==="Water"&&(this.base=new fe(h,{multisample:0,ascendFog:t,emptyAreas:e}),this.base.position.setScalar(0),this.base.scale.setScalar(1),this.base.quaternion.identity(),this.base.rotation.set(Math.PI/-2,0,0),this.base.renderOrder=990,a.updateWorldMatrix(!0),this.base.applyMatrix4(a.matrixWorld),this.base.scale.multiplyScalar(2),this.base.updateMatrix(),this.base.updateMatrixWorld(!0),this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0)}),this.mirror=o(n(.62),"fl_lake_mirror"),this.depthScale=o(n(30),"fl_lake_depth_scale"),this.clipBias=o(n(-.07),"fl_lake_clip_bias"),this.minDepthThreshold=o(n(6e-4),"fl_lake_min_depth_threshold"),this.maxDepthThreshold=o(n(.01),"fl_lake_max_depth_threshold"),this.distortion=o(n(.1),"fl_lake_distortion"),this.mixContrast=o(n(.83),"fl_lake_mix_contrast");const b=this.base.scale.x/this.base.scale.y,_=12;[x,r,c].forEach(a=>{a.repeat.set(b,1).multiplyScalar(_),a.wrapT=a.wrapS=K,a.needsUpdate=!0}),this.material=this.base.material,this.material.map=x,this.material.roughnessMap=c,this.material.normalMap=r,this.material.distortionMap=r,this.material.mirror=this.mirror.value,this.material.depthScale=this.depthScale.value,this.material.clipBias=this.clipBias.value,this.material.minDepthThreshold=this.minDepthThreshold.value,this.material.maxDepthThreshold=this.maxDepthThreshold.value,this.material.distortion=this.distortion.value,this.material.mixContrast=this.mixContrast.value;const d=this.dummy=new R(h,new X);d.applyMatrix4(this.base.matrixWorld),d.visible=!1,d.renderToDepthPrepass=!0,d.renderOrder=990,this.scene.addObject3D(d),l.hooks.beforeDepthPass.watch(this.beforeDepthPass,this),l.hooks.afterDepthPass.watch(this.afterDepthPass,this)}beforeDepthPass(){this.base.visible=!1,this.dummy.visible=!0}afterDepthPass(){this.base.visible=!0,this.dummy.visible=!1}update(){const{$game:t}=this.webgl;this.base.material.tDepth=t.depthPrepass.value}destroy(){const{$game:t}=this.webgl;t.hooks.beforeDepthPass.unwatch(this.beforeDepthPass,this),t.hooks.afterDepthPass.unwatch(this.afterDepthPass,this),super.destroy()}dispose(){this.base.geometry.dispose(),this.base.material.dispose()}}new v(0,5,10);class pe extends U{init(){const{$store:t}=this.webgl;this.base=new Z,this.alColor=o(n(11250643),"fl_alColor"),this.alIntensity=o(n(1),"fl_alIntensity"),this.dlColor=o(n(14933705),"fl_dlColor"),this.dlIntensity=o(n(.5),"fl_dlIntensity"),this.sunColor=o(n(16775399),"fl_sunColor"),this.sunIntensity=o(n(1.6),"fl_sunIntensity"),this.sunDistance=o(n(0),"fl_sunDistance"),this.sunDecay=o(n(2),"fl_sunDecay"),this.al=new ee(this.alColor.get(),this.alIntensity.get()),this.al.layers.enable(t.layers.PLAYER),this.sun=new te(this.sunColor.get(),this.sunIntensity.get(),this.sunDistance.get()),this.sunPosition=o(n(new v(400,300,-100)),"fl_sunPosition"),this.sun.position.copy(this.sunPosition.get()),this.sun.matrixAutoUpdate=!1,this.sun.manualMatrixUpdate=!0,this.sun.layers.enable(t.layers.PLAYER),this.sun.updateMatrix(),this.base.add(this.al,this.sun)}update(){const t=this.scene.camera.cam;this.sun.position.copy(this.sunPosition.value),this.sun.position.x+=t.position.x,this.sun.updateMatrix()}}class _e extends U{init(){this.webgl.$store.camBoundaries,this.base=new R(this.webgl.$assets.geometries.register("plane",O),new se({color:16777215})),this.base.rotation.x=Math.PI/-2,this.base.renderOrder=990,this.base.renderToDepthPrepass=!0,this.base.matrixAutoUpdate=!1,this.base.manualMatrixUpdate=!0,this.position=this.base.position,this.position.y=-15,this.base.updateMatrix(),this.base.material.onBeforeCompile=t=>{Object.assign(t.uniforms,{...k.fog})},this.updateScale()}update(){const t=this.scene.camera;this.base.position.x=t.base.position.x,this.base.updateMatrix()}updateScale(){const{horizontal:t,vertical:e}=this.webgl.$store.camBoundaries,s=(t.value.y-t.value.x)*1e3,l=(e.value.y-e.value.x)*10;this.base.scale.set(s,l,1),this.base.updateMatrix(),this.base.updateMatrixWorld(!0)}dispose(){this.base.geometry.dispose(),this.base.material.dispose()}}class ye extends C{constructor(){super(...arguments);E(this,"name","frozen_lake")}static async load(){const{load:e}=y.$assets;await Promise.all([e("frozen_lake/dataset",{id:"fl_dataset"}),e("frozen_lake/env",{id:"fl_env"}),e("frozen_lake/extras",{id:"fl_extras"}),e("frozen_lake/empty_areas",{id:"fl_empty_areas",data:!0,flipY:!0,linear:!0}),e("frozen_lake/lake/map",{id:"fl_lake_map",data:!0,flipY:!1,linear:!0,repeat:!0}),e("frozen_lake/lake/roughness",{id:"fl_lake_roughness",data:!0,flipY:!1,linear:!0,repeat:!0}),e("frozen_lake/lake/normal",{id:"fl_lake_normal",data:!0,flipY:!1,linear:!0,repeat:!0}),e("frozen_lake/lut",{id:"fl_lut",data:!0,flipY:!1,linear:!0}),e("frozen_lake/lut-storm",{id:"fl_lutstorm",data:!0,flipY:!1,linear:!0}),e("hdri",{}),...C.getLoadArray("frozen_lake/textures/albedo","fl_env/albedo",{data:!0}),...C.getLoadArray("frozen_lake/textures/roughness","fl_env/roughness",{data:!0}),...C.getLoadArray("frozen_lake/textures/normal","fl_env/normal",{data:!0}),...C.getLoadArray("frozen_lake/textures/metallic","fl_env/metallic",{data:!0})])}init(){const{$particles:e,$assets:s,$game:l}=this.webgl;this.fogColor.set(16777215),this.fog.near=50,this.fog.far=140,k.fog.fogFarDensity.value=0,this.color=6985417,this.isAfterStorm=n(!1),this.lut=y.$assets.textures.fl_lut,this.lutStorm=y.$assets.textures.fl_lutstorm,this.ascendFog=new ne(this.name,{color:10006491,density:3.8,offset:-6.14,frequency:.0082,amplitude:1.63,speed:2.6,lacunarity:1,gain:.63}),this.reset(),this.generateLevel(),l.events.reset.watch(()=>{this.isAfterStorm.set(!1)})}afterInit(){var e,s,l,p;super.afterInit(),this.sky=this.add(z,{current:"day",layer:z.DAY,color:this.ascendFog.color.value}),this.ground=this.add(_e,{color:this.ascendFog.color}),this.title.instance.color.set(10996207),(e=this.ld.collectiblesManager)==null||e.setColors(16702816,16702816),(s=this.ld.combosManager)==null||s.setColors(6523064,6523064),this.storm&&((l=this.storm)==null||l.setColors({topColor:6985417,botColor:11389918,shadowColor:6985417}),(p=this.storm)==null||p.setWeather({iceFactor:1}))}in(){const{$particles:e}=this.webgl;e.addTo(this.base,["smoke","gem_normal","gem_emissive","birds_normal","trail","titles","wind"]),this.zeppelin.materials.Ballon.emissive.set(0),this.zeppelin.materials.Ballon.envMapIntensity=.6,this.zeppelin.materials.Ballon.fresnelIntensity=.4,this.zeppelin.materials.Ring.emissive.set(7105111),this.zeppelin.materials.Temple.color.set(16777215),this.isAfterStorm.set(!1),this.temple.templeMaterial.emissiveIntensity=.2}out(){this.webgl}destroy(){const{$particles:e,$game:s}=this.webgl;e.removeFromParent(["smoke","gem_normal","gem_emissive","birds_normal","trail","titles","wind"]),super.destroy()}update(){const e=this.webgl.$time.dt*.001;this.ascendFog.update(e),this.ascendFog.offset.value=this.isAfterStorm.value&&this.webgl.$game.state.is("Game")?-9.95:-6.14}generateLevel(){var a;const{$assets:e,$game:s,$particles:l,$renderer:p,$app:x}=this.webgl,{bgm:c}=x.$audio;this.lights=this.add(pe);const r=(a=e.data.fl_dataset)!=null&&a.empty_area?{texture:e.textures.fl_empty_areas,transform:[...e.data.fl_dataset.empty_area.pos,...ae(e.data.fl_dataset.empty_area.size)]}:null;this.clouds=this.add(re,{noiseFrequency:.3,noiseAmplitude:3.5,windSpeed:.05,scales:{x:8,y:10},offsetY:-7,density:16,layers:3,repartition:60,ascendFog:this.ascendFog,color:5724527,lightColor:14655578,cloudsSmoothness:.04,emptyAreas:r}),this.environment=this.add(oe,{lightmapScale:e.data.fl_dataset.lightmap_scale,scene:e.objects.fl_env.scene,ascendFog:this.ascendFog,texturePrefix:"fl_env"}),this.lake=this.add(me,{ascendFog:this.ascendFog,emptyAreas:r}),this.hotairballoon=this.add(ie);const{atlas:h,res:b,..._}=this.clouds.material.uniforms,d=l.batchers.smoke;Object.assign(d.base.material.defines,this.clouds.material.defines),Object.assign(d.base.material.uniforms,{res:p.drawingBufferSize,..._}),this.level=s.levels.create(this.name,{scene:this,data:e.data.fl_dataset}),this.level.stormy.watch(g=>{this.storm.toggleStorm(g),this.isAfterStorm.set(!g),c.toggle("fl_storm",g,{force:!0})})}dispose(){const{fl_lightmap:e,fl_empty_areas:s,fl_lake_map:l,fl_lake_roughness:p,fl_lake_normal:x,fl_lut:c,fl_lutstorm:r}=this.webgl.$assets.textures;[e,s,l,p,x,c,r].forEach(h=>h==null?void 0:h.dispose()),super.dispose()}}export{ye as default};
