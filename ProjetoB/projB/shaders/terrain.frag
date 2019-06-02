#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D texTerrain;
uniform sampler2D texTerrainColors;
uniform sampler2D texTerrainMap;


void main() {


	vec4 color = texture2D(texTerrain, vTextureCoord);
    vec4 color2 = texture2D(texTerrainMap, vTextureCoord);
	vec4 altimetry = texture2D(texTerrainColors, vec2(1.0 - color2.b, 1.0 - color2.b));

	gl_FragColor = color * 0.6 + altimetry * 0.4;

}