import Prompt from 'prompt-sync'
const prompt = Prompt({sigint: true})

prompt('Hello, I am a Bot to calculate PF on your retirement age')

const agePrompt = prompt('How old are you? ')
const retirementAgePrompt = prompt('At what age do you want to retire? ')
const currentPfBalancePrompt = prompt('What is your current PF balance? ')
const basicSalaryPrompt = prompt('What is your basic salary per month? ')
const incremetPersentagePrompt = prompt('What is your incremet %? ')
const pfInterestPrompt = prompt('What is your pf interest rate anualy in %? ')

const age = parseInt(agePrompt) < 18 ? 18 : parseInt(agePrompt)
const retirementAge = parseInt(retirementAgePrompt) > 58 ? 58 : parseInt(retirementAgePrompt)
const currentPfBalance = parseInt(currentPfBalancePrompt) || 0
const basicSalary = parseInt(basicSalaryPrompt) || 12000
const incremetPersentage = parseFloat(incremetPersentagePrompt) || 0
const pfInterestPerMonth = parseFloat(pfInterestPrompt) > 0.00 ? parseFloat(pfInterestPrompt) / 12 : 8 / 12

const employeeShareEPF = (basicSalary * 12) / 100
const employerShareEPS = (basicSalary * 8.33) / 100 > 1250 ? 1250 : (basicSalary * 8.33) / 100
const employerShareEPF = employeeShareEPF - employerShareEPS
console.log('employerShareEPF:', employerShareEPF)

const tenure = (retirementAge - age) * 12

let pfBalance = currentPfBalance
let totalContributedBalance = 0
let salary =  basicSalary

for(let i = 0; i < tenure; i++) {
    const contribution = ((salary * 12) / 100) + ((salary * 8.33) / 100 > 1250 ? 1250 : (salary * 8.33) / 100)
    if(i !== 0 && i % 12 === 0) {
        salary = salary + ((salary * incremetPersentage) / 100)
    }
    totalContributedBalance = totalContributedBalance + contribution
    pfBalance = pfBalance + contribution
    pfBalance = pfBalance + ((pfBalance * pfInterestPerMonth) / 100)
}

console.log('salary:', salary)
console.log('pfBalance:', pfBalance)
console.log('totalContributedBalance:', totalContributedBalance)


console.log('Age:', age, 'Retirement Age:', retirementAge, 'Current Pf Balance:', currentPfBalance, 'Basic Salary:', basicSalary, 'Incremet Persentage:', incremetPersentage, 'PF Interest per month:', pfInterestPerMonth)