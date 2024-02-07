const evaluate = a => {
    console.log(a)
    // verify if syntax is right 
    let c = 0, b = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i] === '(') c++
        if (a[i] === ')') b++
    }
    if (c !== b) return 'Error synatx ()'
    // when we find ) go back trough a to find indexOf ( then calculate between () and replace it with result
    let l = a.indexOf(')')
    if (l === -1) return a
    for (let i = l; i >= 0; i--) {
        if (a[i] == '(') {
            a = removeAndReplace(a, 'R', i, l)
            break
        }
    }
    return evaluate(a)
}
const removeAndReplace = (s, sbtr, b, e) => {
    // remove a substring from s [b ---> e] and replace it with sbtr
    // s = 'helloEveryone' substring =  'i' start index = 1 end index = 4  should return 'hiEveryone
    e = e + 1
    let s1 = s.substring(0, b)
    let s2 = s.substring(e)
    s1 = s1 + sbtr + ''
    s = s1 + s2 + ''
    return s
}
const divisionP = a => {
    console.log(a)
    let l = a.indexOf('/')
    if (l === -1) return a
    let k = 0, j = 0
    if (a[l + 1] === '-') isNegative = true
    for (let i = l - 1; i >= 0; i--) {
        if (!(!isNaN(a[i]) || a[i] == '.')) break
        j++
    }
    for (let i = l + 1; i < a.length; i++) {
        if (!(!isNaN(a[i]) || a[i] == '.' || (a[l + 1] == '-' && i == l + 1))) break
        k++
    }
    let result = parseFloat(a.substring(l - j, l)) / parseFloat(a.substring(l + 1, l + k + 1))
    a = removeAndReplace(a, result, l - j, l + k)
    return divisionP(a)
}
const multiP = a => {
    let l = a.indexOf('*')
    if (l === -1) return a
    let k = 0, j = 0
    if (a[l + 1] === '-') isNegative = true
    for (let i = l - 1; i >= 0; i--) {
        if (!(!isNaN(a[i]) || a[i] == '.')) break
        j++
    }
    for (let i = l + 1; i < a.length; i++) {
        if (!(!isNaN(a[i]) || a[i] == '.' || (a[l + 1] == '-' && i == l + 1))) break
        k++
    }
    let result = parseFloat(a.substring(l - j, l)) * parseFloat(a.substring(l + 1, l + k + 1))
    a = removeAndReplace(a, result, l - j, l + k)
    return multiP(a)
}
const removeSigns = a => {
    let b = false
    for ( let i = 0 ;i<a.length;i++) {
        if((isNaN(a[i]) && isNaN(a[i+1]) ) && (a[i]!=='.' || a[i+1]!=='.')) {
            console.log(a[i],a[i+1])
            b = true
            break
        }
    }
    if(!b) return a
    console.log(b)
let l = a.indexOf('-')
if(a.indexOf('-',l+1)===l+1) { a = removeAndReplace(a,'+',l,l+1) } 
if(a.indexOf('+',l+1)===l+1)  { a = removeAndReplace(a,'-',l,l+1) } 
l = a.indexOf('+')
if(a.indexOf('-',l+1)===l+1) { a = removeAndReplace(a,'-',l,l+1) } 
if(a.indexOf('+',l+1)===l+1)  { a = removeAndReplace(a,'+',l,l+1) } 
return removeSigns(a)
}

let test = '5++9----59'
console.log(removeSigns(test))

