function MovementResult(isValid, capturedPiece = null, winner = null) {
    this.isValid = isValid;
    this.capturedPiece = capturedPiece;
    this.winner = winner;
}

export default MovementResult