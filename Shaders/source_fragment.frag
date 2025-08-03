#version 450

// Same uniform layout as in vertex shader (required, even if unused here)
layout(set = 0, binding = 0, std140) uniform UniformBufferObject {
    mat4 MVP;
    vec3 _LightDirection;
};

// Receive the interpolated data from the vertex shader
layout(location = 2) in vec4 v_Color;
layout(location = 3) in vec3 pos;

// Final fragment color output
layout(location = 0) out vec4 out_Color;

void main() {
    out_Color = vec4(1.0, 1.0, 0.0, 1.0); // solid red with full alpha
}
