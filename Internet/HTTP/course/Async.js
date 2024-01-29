const craftingCompleteWait = 2000 
const combiningMaterialsWait = 1000
const smeltingIronBarsWait = 500
const shapingIronWait = 1500

// Don't touch below this line

setTimeout(() => console.log('Iron Longsword Complete!'), craftingCompleteWait)
setTimeout(() => console.log('Combining Materials...'), combiningMaterialsWait)
setTimeout(() => console.log('Smelting Iron Bars...'), smeltingIronBarsWait)
setTimeout(() => console.log('Shaping Iron...'), shapingIronWait)

console.log('Firing up the forge...')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
sleep(5000)
const applyDamage = (damage, currentHP) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const newHP = currentHP - damage;
            if (damage > currentHP) {
                reject('Damage exceeds current HP')
            } else {
                resolve(currentHP - damage)
            }
        }, 1000)
    });
}
function runApplyDamageTest(damage, currentHP) {
    console.log(`Applying ${damage} damage to enemy with ${currentHP} HP`);
    applyDamage(damage, currentHP)
        .then((message) => {
            console.log(`...applyDamage returned: ${message}`);
        }).catch((error) => {
            console.log(`...applyDamage threw an error: ${error}`);
        });
}
runApplyDamageTest(100, 1000)