declare module 'indian-states-cities' {
  interface State {
    [key: string]: string[]
  }

  interface StatesAndCities {
    states: string[]
    indianCities: (state: string) => string[]
  }

  const statesAndCities: StatesAndCities
  export = statesAndCities
}
