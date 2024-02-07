
const mathOperation = function (a, b, o) {
    let result
    if (o == '+') { result = a + b }
    else if (o == '-') { result = a - b }
    else if (o == 'x' || o == '*') { result = a * b }
    else {
        result = a / b
    }
    return result
}
const linearCalcul = s => {
    // console.log(s)
    s=removeDuplicateSigns(s)
    let isNegative = false
    if (s.indexOf('-') == 0) isNegative = true
    let skip = isNegative ? 1 : 0
    // if (s.substring(skip,s.length).indexOf('(') != -1 || s.substring(skip,s.length).indexOf(')') != -1 || s.indexOf('*') != -1 || s.indexOf('/') != -1) return false
    if (s.substring(skip, s.length).indexOf('+') == -1 && s.substring(skip, s.length).indexOf('-') == -1) { return s }
    const giveUsJustNumbers = ((s) => {
        let isNegative = false
        if (s.indexOf('-') == 0) isNegative = true
        let skip = isNegative ? 1 : 0
        s = s.substring(skip, s.length)
        let end
        let indexOfPlus = s.indexOf('+')
        let indexOfMinus = s.indexOf('-')
        if (indexOfMinus == -1 && indexOfPlus == -1) return s
        if (indexOfMinus == -1 || indexOfPlus == -1) {
            end = indexOfMinus > indexOfPlus ? indexOfMinus : indexOfPlus
        }
        else {
            end = indexOfMinus < indexOfPlus ? indexOfMinus : indexOfPlus
        }
        if (isNegative) return '-' + s.substring(0, end)
        else return s.substring(0, end)
    })
    let temp1 = giveUsJustNumbers(s)
    let operation = s.substring(temp1.length, temp1.length + 1)
    let temp2 = giveUsJustNumbers(s.substring(temp1.length + 1, s.length))
    let result = mathOperation(parseFloat(temp1), parseFloat(temp2), operation)
    s = result.toString() + s.substring(temp1.length + temp2.length + 1, s.length + 1)
    return linearCalcul(s)
}
const priorityCalculDivision = s => {
    s=removeDuplicateSigns(s)
    console.log(s)
    let isNegative = false
    let isNegative2 = false
    if (s.indexOf('/') == -1) return s
    let dp = s.indexOf('/')        // division mark first position
    if (s.indexOf('-', dp + 1) == dp + 1) isNegative2 = true
    let tempSt = s.substring(0, dp)
    let tempS = s.substring(0, dp).split('')
    let prevLength
    for (let i = tempS.length - 1; i >= 0; i--) {
        let a = tempS[i]
        if (a == '+' || a == '-' || a == '*' || a == '/') {
            prevLength = tempS.length - i
            break
        }
    }
    let temp1 = tempSt.substring(tempSt.length - prevLength + 1, tempSt.length)
    tempSt = s.substring(dp + 1, s.length)
    tempS = s.substring(dp + 1, s.length).split('')
    let skip = isNegative2 ? 1 : 0
    for (let i = skip; i < tempS.length; i++) {
        let a = tempS[i]
        if (a == '+' || a == '-' || a == '*' || a == '/') {
            prevLength = i
            break
        }
    }
    let temp2 = tempSt.substring(0, prevLength);
    let slength = temp1.length + temp2.length
    s = s.substring(0, dp - temp1.length) + mathOperation(parseFloat(temp1), parseFloat(temp2), '/') + s.substring(dp + temp2.length + 1, s.length + 1)
    return priorityCalculDivision(s)
}
const priorityCalculM = s => {
    s=removeDuplicateSigns(s)
    console.log(s)
    let isNegative = false
    let isNegative2 = false
    if (s.indexOf('*') == -1) return s
    let dp = s.indexOf('*')        // division mark first position
    if (s.indexOf('-', dp + 1) == dp + 1) isNegative2 = true
    let tempSt = s.substring(0, dp)
    let tempS = s.substring(0, dp).split('')
    let prevLength
    for (let i = tempS.length - 1; i >= 0; i--) {
        let a = tempS[i]
        if (a == '+' || a == '-' || a == '*' || a == '/') {
            prevLength = tempS.length - i
            break
        }
    }
    let temp1 = tempSt.substring(tempSt.length - prevLength + 1, tempSt.length)
    tempSt = s.substring(dp + 1, s.length)
    tempS = s.substring(dp + 1, s.length).split('')
    let skip = isNegative2 ? 1 : 0
    for (let i = skip; i < tempS.length; i++) {
        let a = tempS[i]
        if (a == '+' || a == '-' || a == '*' || a == '/') {
            prevLength = i
            break
        }
    }
    let temp2 = tempSt.substring(0, prevLength);
    let slength = temp1.length + temp2.length
    s = s.substring(0, dp - temp1.length) + mathOperation(parseFloat(temp1), parseFloat(temp2), '*') + s.substring(dp + temp2.length + 1, s.length + 1)
    return priorityCalculM(s)
}
const removeDuplicateSigns = s => {
    console.log(s)
    s = s.split('')
    let p = '+', m = '-'
    let finished = true
    const swap = ((a, j, f) => {
        a[j] = f
        for (let i = j + 1; i < a.length; i++) {
            a[i] = a[i + 1]
        }
    })
    for (let i = 0; i < s.length; i++) {
        if ((s[i] == p && s[i + 1] == m) || (s[i] == m && s[i + 1] == p)) {
            swap(s, i, m)
            finished = false
        }
        if (s[i] == m && s[i + 1] == m) {
            swap(s, i, p)
            finished = false
        }
        if (s[i] == p && s[i + 1] == p) {
            swap(s, i, p)
            finished = false
        }
    }
    let st = ''
    s.forEach(e => {
        if (e != undefined) st += e
    });
    if (finished) return st
    return removeDuplicateSigns(st)
}
const evaluate = s => {
    console.log('initial  ',s)
    let j = ')', l = '('
    if(s.indexOf(j)==-1 || s.indexOf(l)==-1) return s
    s1 = s.split('')
    const parseSt = ((a,ii,j) => {
        let st  = ''
        for(let i = ii+1 ; i<j ; i++) {
            st += a[i]
        }
        st = linearCalcul(st)
        st = st.split('')
        let l = j-ii
        let temp = []
        for (let  i = ii ; i<a.length ; i++){
            if(i==ii){
                for (let k = 0; k < st.length; k++) {
                   a[i+k] = st[k]
                }
                i+=st.length
            }
            a[i]=a[i+l]
        }
        return a
    })
    const find = ((a,i) => {
        let index = i
        let ll = s1.indexOf('(',i+1)
        //if(ll==-1) {console.log('here');return a;}
        while (i<a.length) {
            i++
            if(a[i]==j) {
                parseSt(a,index,i)
                break
            }
        }
        let temp = []
        a.forEach(e => {
            if(e!=undefined) temp.push(e)
        });
        s = ''
        temp.forEach(e => {
            if(e!=undefined) s+=e
        });
    })
    find(s1,s1.indexOf('('))
    console.log('fianl',s,'index of ( i ',s1.indexOf('('))
    return evaluate(s)
    

}
const calcul = s => linearCalcul(priorityCalculM(priorityCalculDivision(s)))



// test unit hello everyone my name is jawad el yousfi im from ousedzem
const mathExpression = '5+45*(45/5)-12*(4+9-5)-0*8+12+(12*8-2)*4'
const simplExpression = '(((5++++6-------9)))'

console.log('final result is = ' + calcul(mathExpression))




/**
let plusPosition = s.indexOf('+', dp)
let minusPosition = s.indexOf('-', dp)
let multiplyPosition = s.indexOf('*', dp)
let divisionPosition = s.indexOf('/', dp)
let operators = [{ operator: '+', position: s.indexOf('+', dp+1) },
{ operator: '-', position: s.indexOf('-', dp+1) },
{ operator: '*', position: s.indexOf('*', dp+1) },
{ operator: '/', position: s.indexOf('/', dp+1) }
]
let tempA = []
 operators.forEach(e => {
    if(e.position!=-1) tempA.push(e)
});
tempA.sort((a,b) => a.position-b.position)
console.log(tempA)

for (let i = 0; i < s.length; i++) {
      if (s[i] == p && s[i + 1] == p) {
          swap(s, i,p)
          finished = false
      }
  }
  for (let i = 0; i < s.length; i++) {
      if ((s[i] == p && s[i + 1] == m) || (s[i] == m && s[i + 1] == p) ) {
          swap(s, i,m)
          finished = false
      }
  }
  for (let i = 0; i < s.length; i++) {
      if (s[i] == m && s[i + 1] == m) {
          swap(s, i,p)
          finished = false
      }
  }
  */

