#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;

uniform sampler2D texTerrain;

void main() {
	vec4 color = texture2D(texTerrain, vTextureCoord );
	gl_FragColor = color;
}