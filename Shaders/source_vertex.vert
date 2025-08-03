#version 450

// This is the uniform buffer that contains all of the settings we sent over from the cpu in _render_callback. Must match with the one in the fragment shader.
layout(set = 0, binding = 0, std140) uniform UniformBufferObject {
    mat4 MVP;
    vec3 _LightDirection;
    float _time;
};

// This is the vertex data layout that we defined in initialize_render after line 198
layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec4 a_Color;

// This is what the vertex shader will output and send to the fragment shader.
layout(location = 2) out vec4 v_Color;
layout(location = 3) out vec3 pos;


#define PI 3.141592653589793238462

void main() {
    // Passes the vertex color over to the fragment shader, even though we don't use it but you can use it if you want I guess
    v_Color = a_Color;

    // The fragment shader also calculates the fractional brownian motion for pixel perfect normal vectors and lighting, so we pass the vertex position to the fragment shader
    pos = a_Position;

    // Multiply final vertex position with model/view/projection matrices to convert to clip space
    gl_Position = MVP * vec4(pos.x * (1 + _time), _time * 3, pos.z * (1 + 5 * _time), 1);
}