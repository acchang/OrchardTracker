const BlazeField = document.querySelectorAll('.fa-fire')

Array.from(BlazeField).forEach((element)=>{
    element.addEventListener('click', deletePlot)
})

async function deletePlot(){
    const lineDate = this.parentNode.childNodes[1].innerText
    const linePlot = this.parentNode.childNodes[3].innerText
    const lineVariety = this.parentNode.childNodes[5].innerText
    try{
        const response = await fetch('deletePlot', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'DateDelete': lineDate,
              'PlotDelete': linePlot,
              'VarietyDelete': lineVariety
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

const YieldNumber = document.querySelectorAll('.fa-seedling')

Array.from(YieldNumber).forEach((element)=>{
    element.addEventListener('click', addYield)
})

async function addYield(){
    const lineDate = this.parentNode.childNodes[1].innerText
    const linePlot = this.parentNode.childNodes[3].innerText
    const lineVariety = this.parentNode.childNodes[5].innerText
    const lineYield = Number(this.parentNode.childNodes[7].innerText)
    try{
        const response = await fetch('addOneYield', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'DateUpdate': lineDate,
                'PlotUpdate': linePlot,
                'VarietyUpdate': lineVariety,
                'YieldUpdate': lineYield
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}





const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/trees', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: '2000-03-20',
            // ideally set to today
            plot: '00',
            variety: 'soybeans'
        })
    })
  })

const messageDiv = document.querySelector('#message')

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('click', _ => {
    console.log("beans")
    fetch('/trees', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variety: 'cucumbers'
      })
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No cukes to delete') {
          messageDiv.textContent = 'No cukes to delete'
        } else {
          window.location.reload(true)
        }
      })
        .catch(error => console.error(error))
})