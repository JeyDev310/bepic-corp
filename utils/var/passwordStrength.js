const hasNumber = (value) => {
  return new RegExp(/[0-9]/).test(value)
}
const hasMixed = (value) => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value)
}
const hasSpecial = (value) => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value)
}
export const strengthLevel = (count) => {
  const levelsTpl = {
    lv1: { color: '#CD5959', text: 'Too weak' },
    lv2: { color: '#F26161', text: 'Weak' },
    lv3: { color: '#5472DE', text: 'Okay' },
    lv4: { color: '#00C246', text: 'Good' },
    lv5: { color: '#13A849', text: 'Strong' },
  }
  if (count < 2) {
    return [levelsTpl.lv1]
  }
  if (count < 3) {
    return [levelsTpl.lv1, levelsTpl.lv2]
  }
  if (count < 4) {
    return [levelsTpl.lv1, levelsTpl.lv2, levelsTpl.lv3]
  }
  if (count < 5) {
    return [levelsTpl.lv1, levelsTpl.lv2, levelsTpl.lv3, levelsTpl.lv4]
  }
  if (count < 6) {
    return [
      levelsTpl.lv1,
      levelsTpl.lv2,
      levelsTpl.lv3,
      levelsTpl.lv4,
      levelsTpl.lv5,
    ]
  }
}
export const strengthIndicator = (value) => {
  let strengths = 0
  if (value.length > 6) strengths++
  if (value.length > 8) strengths++
  if (hasNumber(value)) strengths++
  if (hasSpecial(value)) strengths++
  if (hasMixed(value)) strengths++
  return strengths
}
