const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/trees', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            date: '2000-03-20',
            variety: 'beans'
        })
    })
  })

  const deleteButton = document.querySelector('#delete-button')

//   deleteButton.addEventListener('click', _ => {
//     fetch('/trees', {
//       method: 'delete',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         variety: 'cucumbers'
//       })
//     })
//       .then(res => {
//         if (res.ok) return res.json()
//       })
//       .then(data => {
//         window.location.reload()
//       })
//     //   .then(response => {
//     //     if (response === 'No cherries to delete') {
//     //       messageDiv.textContent = 'No cherries to delete'
//     //     } else {
//     //       window.location.reload(true)
//     //     }
//     //   })
//     //   .catch(/* ... */)
//     //   .then(data => {
//     //     window.location.reload()
//     //   })
//   })


deleteButton.addEventListener('click', _ => {
    console.log("beans")
    fetch('/trees', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variety: 'beans'
      })
    })
})

 /*   
      .then(res => {
        if (res.ok) return res.json()
      })
    //   .then(data => {
    //     window.location.reload()
    //   })
      .then(response => {
        if (response === 'No cukes to delete') {
          messageDiv.textContent = 'No cukes to delete'
        } else {
          window.location.reload(true)
        }
      })
      .catch(console.error)
    //   .catch(error => console.error(error))
})
*/