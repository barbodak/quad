#version 450

// This is the uniform buffer that contains all of the settings we sent over from the cpu in _render_callback. Must match with the one in the fragment shader.
layout(set = 0, binding = 0, std140) uniform UniformBufferObject {
    mat4 MVP;
    vec3 _LightDirection;
    float _junk;
    float _time;
    float _rawtime;
    vec2 top;
    vec2 but;
};

layout(location = 0) in vec3 a_Position;
layout(location = 1) in vec4 a_Color;

layout(location = 2) out vec4 v_Color;
layout(location = 3) out vec3 pos;


#define PI 3.141592653589793238462

vec3 get_pos(vec3 org) {
    float rawtime = _rawtime;
    float a = cos((rawtime * 5 + org.x / 3));
    float b = cos((rawtime * 4 + org.z / 3));
    float rel_x = (org.x - but.x) / (top.x - but.x) * 2;
    float rel_y = (org.z - but.y) / (top.y - but.y) * 2;
    return vec3(org.x, ((rel_x * rel_y) + a + b) * 5, org.z);
}


void main() {
    v_Color = a_Color;

    pos = a_Position;
   gl_Position = MVP * vec4(get_pos(pos), 1);
}