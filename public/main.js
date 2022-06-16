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