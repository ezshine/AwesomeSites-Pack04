precision highp float;
varying vec2 vUV;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vMaskUV;
uniform sampler2D sourceSampler;
uniform sampler2D maskSampler;
void main(void) {
	vec4 sourceColor = texture2D(sourceSampler, vUV);
	float mask = texture2D(maskSampler, vMaskUV).r;
	gl_FragColor = vec4( sourceColor.rgb * vColor, sourceColor.a * mask * vAlpha);
}
