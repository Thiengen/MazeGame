class oscillator {
	static oscillateInCanvas(side, frequency = 1, amplitude = 1, offset = 0) {
		return map(cos(radians(frameCount * frequency)), -1, 1, side / 2 - amplitude, side / 2 + amplitude) + offset;
	}
}
