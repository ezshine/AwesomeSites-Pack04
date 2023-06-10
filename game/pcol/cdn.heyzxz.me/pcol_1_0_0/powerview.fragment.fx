precision highp float;
uniform sampler2D textureSampler;
uniform vec3 highlightColor;
uniform float alpha;
uniform float bgAlpha;
uniform float highlightLen;
varying vec2 vUV;
varying float vLen;
void main(void) {
	vec4 multiply = vec4( 1.0,1.0,1.0, bgAlpha );
	if( vLen < highlightLen ) {
		multiply = vec4( highlightColor, 1.0 );
	}
	multiply.a *= alpha;
	gl_FragColor = texture2D(textureSampler, vUV) * multiply;
}
