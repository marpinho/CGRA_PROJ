attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;


uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform float normScale;

uniform sampler2D texTerrainMap;

void main() {
	
	vec4 color = texture2D(texTerrainMap, aTextureCoord + vec2( 0.006, 0.006));	
	vec3 offset = vec3(0, 0, 0.09*color.b);
		
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
	vTextureCoord = aTextureCoord;
}
