precision highp float;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 color;
attribute float alpha;
uniform mat4 world;
uniform mat4 viewProjection;
uniform vec4 border;
varying vec2 vUV;
varying vec3 vColor;
varying float vAlpha;
varying vec2 vMaskUV;
void main(void) {
 	vec4 worldPos = world * vec4(position, 1.0);
    gl_Position = viewProjection * worldPos;
    vUV = uv;
    vColor = color;
    vAlpha = alpha;
    vMaskUV.x = (worldPos.x - border.x) / border.z + 0.5;
 	vMaskUV.y = (worldPos.z - border.y) / border.w + 0.5;
}
