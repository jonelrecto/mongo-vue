var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs(
  'meantask',
  ['tasks']
)

router.get('/tasks', (req, res) => {
  db.task.find((err, tasks) => {
    if (err) {
      res.send(err)
    }
    console.log(req, 'req')
    console.log(err, 'errr')
    console.log(tasks, 'tasks')
    res.json(tasks)
  })
})

// add task
router.post('/task', (req, res) => {
  var task = req.body
  console.log(task)
  if (!task.title) {
    res.status(400)
    res.json( {
      error: 'bad data'
    })
  } else {
    db.task.save(task, (err, task) => {
      if (err) {
        res.send(err)
      } else {
        res.json(task)
      }
    })
  }
})


// delete task
router.delete('/task/:id', (req, res) => {
  db.task.remove({ _id: mongojs.ObjectId(req.params.id)}, (err, task) => {
    if (err) {
      res.send(err)
    } else {
      res.json(task)
    }
  })
})

// update task

router.put('/task/:id', (req, res) => {
  var task = req.body
  var updTask = {}

  if (task.title) {
    updTask.title = task.title
  }

  if (!updTask) {
    res.status(400)
    res.json({
      error: 'bad data'
    })
  } else {
    db.task.update(
      { _id: mongojs.ObjectId(req.params.id) },
      updTask,
      {},
      (err, task) => {
        if (err) {
          res.send(err)
        }
        res.json(task)
      }
    )
  }
})

module.exports = router