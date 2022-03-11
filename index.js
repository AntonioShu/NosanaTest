const tasks = [{
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: false,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title: 'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: false,
    body: 'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body: 'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title: 'Deserunt laborum id',
  },
];

// 1. Если массив с задачами пустой то под формой нужно выводить сообщение об этом, также это же сообщение нужно выводить если вы удалите все задачи.

// //2. В каждый элемент li добавить кнопку которая будет делать задачу выполненной. завершенные задачи должны быть подсвечены любым цветом.

// //3. Добавить функционал отображения незавершенных задач и всех задач. т.е у вас будет две кнопки над таблицей 1-я "показать все задачи" и 2-я "показать незавершенные задачи", определить завершена задача или нет можно по полю completed в объекте задачи.  По умолчанию при загрузке отображаются все задачи. 

// *Задача со звездочкой. При завершении задачи в разделе "незавершенные задачи" она должна от туда пропадать и быть видна в разделе "все задачи" при этом во всех задачах завершенные задачи могут быть востановленны. Также в разделе "все задачи" завершенные задачи должны быть в самом низу после открытых задач.  


(function (arrTasks) {
  const ulContainer = document.querySelector('.tasks-list-section .list-group');
  const form = document.forms['addTask'];
  const formTitle = form.elements['title'];
  const formBody = form.elements['body'];
  const filterGroupTasks = document.querySelector('.filter-tasks');

  form.addEventListener("submit", formSubmitHendler);

  ulContainer.addEventListener('click', delTaskHendler);
  ulContainer.addEventListener('click', executeTaskHendler);
  filterGroupTasks.addEventListener('click', filterTasks);

  renderAllTasks(arrTasks);

  function boolComolited(bool) {
    const newArrTasks = arrTasks.filter(item => item.completed == bool);
    const ul = ulContainer.children;
    [...ul].forEach(item => {
      item.remove();
    });
    console.log(newArrTasks);
    renderAllTasks(newArrTasks);
  }

  function filterTasks(event) {
    const eventBtn = event.target;
    if (eventBtn.classList.contains('unfinished-tasks')) {
      console.log('unfinished-tasks');
      boolComolited(false);
    } else {
      if (eventBtn.classList.contains('completed-tasks')) {
        console.log('completed-tasks');
        boolComolited(true);
      } else {
        if (eventBtn.classList.contains('all-tasks')) {
          console.log('all-tasks');
          const ul = ulContainer.children;
          [...ul].forEach(item => {
            item.remove();
          });
          renderAllTasks(arrTasks);
        }
      }
    }
  }

  // Формирует объект объектов с ключом в виде id
  const arrOfTasks = tasks.reduce((acc, item) => {
    acc[item._id] = item;
    return acc;
  }, {});

  // Пустй таск лист
  function emptyTasks() {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2')
    li.textContent = "Таски пуст";
    ulContainer.appendChild(li);
  }

  // Формирует шаблон li
  function listItemTemplate({
    _id,
    title,
    body,
    completed
  } = {}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const p = document.createElement('p');
    p.classList.add('mt-2', 'w-100');
    p.textContent = body;

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');
    buttonDelete.textContent = 'Delete';

    const buttonCompleted = document.createElement('button');
    if (completed) {
      li.style.background = '#D3D3D3';
      buttonCompleted.classList.add('btn', 'btn-warning', 'mr-auto', 'reject-btn');
      buttonCompleted.textContent = 'Reject Completion';
    } else {
      li.style.background = '#FFFFFF';
      buttonCompleted.classList.add('btn', 'btn-success', 'mr-auto', 'completed-btn');
      buttonCompleted.textContent = 'Completed';
    }

    li.setAttribute('id', _id);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(buttonCompleted);
    li.appendChild(buttonDelete);
    return li;
  }

  // Рендеринг таска
  function renderAllTasks(arr) {
    if (arr.length == 0) {
      emptyTasks();
      return;
    } else {
      const fragment = document.createDocumentFragment();
      arr.forEach(item => {
        if (item.completed == true) {
          fragment.append(listItemTemplate(item));
        } else {
          fragment.prepend(listItemTemplate(item));
        }
      });
      return ulContainer.appendChild(fragment);
    }
  }

  // Формирует таск-объект
  function ObjectTask(title, body) {
    const objTask = {
      _id: 'task-' + String(Math.random()).split('.')[1],
      title: title,
      body: body,
      completed: false,
    }
    // Добавить таск в общи массив
    arrTasks.push(objTask);
    return objTask;
  }

  // Удаляем таск-объект
  function delObjectTask(id) {
    const obj = arrOfTasks[id]
    const i = arrTasks.indexOf(obj, 0)
    arrTasks.splice(i, 1);
  }

  // Заначение complited
  function complitedObjectTask(id, bool) {
    const obj = arrOfTasks[id];
    const i = arrTasks.indexOf(obj, 0);
    arrTasks[i].completed = bool;
  }

  // Добавляет нвый таск в разметку
  function formSubmitHendler(event) {
    event.preventDefault();
    const title = formTitle.value;
    const body = formBody.value;

    if (!title || !body) {
      alert("Input none!");
      return;
    }

    const newTask = ObjectTask(title, body);
    const liNewTask = listItemTemplate(newTask);
    ulContainer.insertAdjacentElement("afterbegin", liNewTask);
    form.reset();
  }

  // Удаляет таск
  function delTaskHendler(event) {
    const delBtn = event.target;
    if (delBtn.classList.contains('delete-btn')) {
      const idElement = delBtn.parentElement.getAttribute('id')
      if (confirm("Ты здесь главный?")) {
        delObjectTask(idElement);
        delBtn.parentElement.remove();
      }
    }
  }

  // Завершение таска
  function executeTaskHendler(event) {
    const executeBtn = event.target;
    const parentExecute = executeBtn.parentElement;
    const id = parentExecute.getAttribute('id');

    if (executeBtn.classList.contains('completed-btn')) {
      parentExecute.style.background = '#D3D3D3';
      ulContainer.insertAdjacentElement('beforeend', parentExecute);
      executeBtn.classList.remove('btn-success', 'completed-btn');
      executeBtn.classList.add('btn-warning', 'reject-btn');
      executeBtn.textContent = 'Reject Completion';
      complitedObjectTask(id, true);
    } else {
      if (executeBtn.classList.contains('reject-btn')) {
        parentExecute.style.background = '#ffffff';
        ulContainer.insertAdjacentElement('afterbegin', parentExecute);
        executeBtn.classList.remove('btn-warning', 'reject-btn');
        executeBtn.classList.add('btn-success', 'completed-btn');
        executeBtn.textContent = 'Completion';
        complitedObjectTask(id, false);
      }
    }
  }

})(tasks);
