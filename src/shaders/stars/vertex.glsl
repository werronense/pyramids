attribute float aScale;
attribute float aTwinkleRandomness;

uniform float uSize;
uniform float uTime;

varying float vTwinkleRandomness;

void main() {
    // Positioning
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Sizing
    gl_PointSize = uSize * aScale;

    // Twinkling
    gl_PointSize *= 1.5 + (0.5 * sin((uTime + aTwinkleRandomness) * 0.00425));

    // Size attenuation
    gl_PointSize *= (1.0 / -viewPosition.z);

    // Varyings
    vTwinkleRandomness = aTwinkleRandomness;
}
