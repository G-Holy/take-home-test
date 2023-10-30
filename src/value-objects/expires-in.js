export class ExpiresIn {
    constructor(days) {
      this.days = days
     }
    
    updateToNextDay() {
      return new ExpiresIn(this.days - 1)
    }
  
    isExpired() {
      return this.days < 0
    }
}
  