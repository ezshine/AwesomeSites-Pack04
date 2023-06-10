precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 world;
uniform mat4 viewProjection;
varying vec2 vUV;
varying float vLen;
void main(void) {
 	vec4 worldPos = world * vec4( position, 1.0 );
    gl_Position = viewProjection * worldPos;
    vUV = uv;
    vLen = -position.x;
}
