#version 450

layout(set = 0, binding = 0, std140) uniform UniformBufferObject {
    mat4 MVP;
    vec3 _LightDirection;
    float _junk;
    float _time;
    float _rawtime;
    vec2 top;
    vec2 but;
};

// Receive the interpolated data from the vertex shader
layout(location = 2) in vec4 v_Color;
layout(location = 3) in vec3 pos;

// Final fragment color output
layout(location = 0) out vec4 out_Color;


vec3 get_pos(vec3 org) {
    float rawtime = _rawtime;
    float a = cos((rawtime * 5 + org.x / 3));
    float b = cos((rawtime * 4 + org.z / 3));
    float rel_x = (org.x - but.x) / (top.x - but.x) * 2;
    float rel_y = (org.z - but.y) / (top.y - but.y) * 2;
    return vec3(org.x, ((rel_x * rel_y) + a + b) * 5, org.z);
}



vec4 get_color() {
    float rawtime = _rawtime;
    float a = cos((rawtime + pos.x));
    float rel_x = (pos.x - but.x) / (top.x - but.x) * 2;
    float rel_y = (pos.z - but.y) / (top.y - but.y) * 2;
    return  vec4(max(0, cos(rel_x + rawtime)), max(0, cos(rel_x + rawtime + 2)), max(0, cos(rel_x + rawtime + 4)), 1.0);
    return vec4(abs(cos(v_Color.x + rawtime + pos.x)),abs(cos(v_Color.y + rawtime + pos.y)), abs(cos(v_Color.z + rawtime + pos.z)), 1.0);
}

void main() {
   // out_Color = vec4(1.0 - a, a, _time, 1.0); // solid red with full alpha
    // out_Color = vec4(max(0, cos(rel_x + _rawtime)), max(0, cos(rel_x + _rawtime + 2)), max(0, cos(rel_x + _rawtime + 4)), 1.0);
    vec3 a = get_pos(pos);
    vec3 b = normalize(get_pos(vec3(pos.xy, pos.z + 0.001)) - a);
    vec3 c = normalize(get_pos(vec3(pos.x + 0.0001, pos.yz)) - a);
    a = normalize(cross(c, b));
    float light = dot(a, _LightDirection+ 1) * 0.5;
    vec4 col = vec4(get_color());
    out_Color = vec4(light * col.rgb, col.a);
}
