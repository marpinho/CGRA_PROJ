#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform sampler2D texWater;

void main() {
	vec4 color = texture2D(texWater, vTextureCoord + vec2(timeFactor * 0.006,timeFactor * 0.006));	
	gl_FragColor = color;
}