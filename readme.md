## ГАЙД ДЛЯ МАЛЮТОК :person_in_manual_wheelchair: :family_man_man_boy:

## ЭндпоинтОчка

### ЮзерОчка :eye: :lips: :eye:

- **POST /users** - регистрация нового пользователя, требует _rocketname_(логин от рокетчата), _email_ в json в body, выдает **_auth-token_** в респонс, отправляет ему пароль в рокетчат.
<!-- - **PUT /users/reg2** - **_требует_** _name_, _lastname_, _position_, _division_(айди существующего отдела) в бади -->
- **PUT users/me/rocket** - меняет существующий _rocketname_ юзера на новый из бади
- **POST /auth** - авторизация, требует _email_ и _password_ ранее зарегестрированного пользователя в json в body, выдает **_auth-token_** в респонс, пользователь остается авторизованным 360000000 секунд(дев).
- **GET /users/me** - показывает инфу текущего авторизованного пользователя
- **GET /users/me/sprints** - показывает все спринты авторизованного пользователя
- **GET /users/all** - показывает всех пользователей
- **GET /users/:id** - показывает пользователя, чей _\_id_ указан в юрл
- **PUT /users/me** - **_требует_** _name_, _lastname_, _position_, _division_(айди существующего отдела) в бади
- **PUT /users/me/a** - меняет/ставит аватар текущего пользователя, требует _file_, возможно формдата
- **PUT /users/me/pw** - меняет пароль на новый _req.body.password_
- **PUT /users/poschange/:id** - меняет _position_ юзера, чей ид указан в юрл
- **PUT /users/permchange/:id** - меняет _permission_ юзера, чей ид указан в юрл
- **DELETE /users/:id** - удаление аккаунта по _\_id_ пользователя

### Отделы

- **POST /divisions** - создает новый отдел с _divname_ и _description_ из бади
- **GET /divisions/all** - выдает все отделы
- **GET /divisions/:divname** - находит отдел, чей _divname_ указан в юрл
- **PUT /divisions/:divname** - вступает в отдел, чей _divname_ указан в юрл, если юзер уже состоял в отделе выходит из него и входит в новый
- **DELETE /divisions/:divname** - выходит из отдела, чей _divname_ указан в юрл

### СисадминОчка :mechanic: :man_mechanic: :mechanic: :place_of_worship:

- **GET /tickets/all** - отправляет в респонс массив со всеми проектами, отсортированными по дате.
- **POST /tickets** - требует авторизации, добавляет новый тикет. Требует **_auth-token_** в хедере, _problemname_, _text_ и _emergency_(опционально - _pcpass_ и скриншот) в json в body. Автоматически ставит _status_ на _true_ и добавляет _name_ и _\_id_ пользователя.
- **GET /tickets/:id** - находит конкретный тикет по его _id_. Выдает всю информацию тикета в полуорганизованном формате в респонсе.
- **GET /tickets/user/:id** - находит все тикеты, созданные пользователем, чей _id_ указан в хедере.
- **GET /tickets/all/active** - находит все открытые тикеты (status:true).
- **GET /tickets/all/emergency** - показывает все тикеты, отсортированные по emergency.
- **PUT /tickets/id** - меняет _status_ тикета на _false_, ~закрывая его.
- **DELETE /tickets/:id** - удалить тикет по ид в юрл

### ПроектОчка :call_me_hand: :call_me_hand: :call_me_hand: :call_me_hand: :call_me_hand:

- **POST /projects/add** - добавить новый проект, указав _title_, _dateStart_, _city_, _type_, _stage_(опционально - _dateFinish_, _customer_, _area_, _about_, создает канал в рокете
- **GET /projects** - получить список всех проектов
- **GET /projects/:auth** - найти проект по _auth_, где _auth_ это _crypt_ или _title_ проекта, указанные в хедере, в респонсе выдает инфу по конкретному проекту если указан crypt, или все проекты с указанным title, если искали через него
- **DELETE /projects/:crypt** - удалить проект, указав его _crypt_ в хедере
- **PUT /projects/:crypt** - изменить информацию проекта, указав его crypt в хедере и новые значения в body. В респонсе измененные данные проекта
- **GET /projects/city/:city** - респонс со всеми проектами в городе, указанном в _city_
- **GET /projects/user/:id** - найти все проекты пользователя _id_
- **PUT /projects/updteam/:crypt** - находит проект по его _crypt_ и добавляет в его команду пользователя, чей айди указан в _userid_ в body
- **PUT /projects/jointeam/:crypt** - текущий пользователь вступает в ~~ИГИЛ~~ команду проекта, чей _crypt_ указан в юрл, также инвайтится в канал рокетчата проекта
- **DELETE /projects/updteam/:crypt** - находит проект по его _crypt_ и убирает из его команды пользователя, чей айди указан в _userid_ в body
- **PUT /projects/finish/:id** - завершает/раззавершает проект по его ид в юрл

### ТЭГИ ДЛЯ ПРОЕКТОВ

- **PUT /projects/tag/:crypt** - Ищет проект по шифру, добавляет _tag_ из бади в массив тэгов
- **DELETE /projects/tag/:crypt** - Ищет проект по шифру, удаляет _tag_ указанный в бади
- **GET /projects/search/:tag** - Находит проекты с тэгами, указанными в бади В ВИДЕ МАССИВА

### СпринтОчка :a: :shark: :a:

- **POST /projects/sprints/new/:crypt** - добавляет пустой спринт к проекту с шифром, указанным в юрл
- **PUT /projects/sprints/d+d/:id** - добавляет _description_ и _date_(планируемая дата окончания) спринту по его _id_ в юрл
- **GET /projects/sprints/:crypt** - показывает все спринты проекта, найденного по его шифру в юрл
- **POST /projects/sprints/addtask/:id** - находит спринт по _id_ в юрл, добавляет массив _tasks_ с _taskTitle_(string), _workVolume_(number),_taskState_:false(boolean) из body
- **PUT /projects/sprints/DAtask/:id** - находит спринт по _id_ в юрл, меняет статус таска, чей ид указан в _taskid_
- **DELETE /projects/sprints/deltask/:id** - находит спринт по ид в юрл, удаляет таск, чей ид указан в _taskid_
- **PUT /projects/sprints/:id** - находит спринт по _id_ в юрл, меняет его статус. Также меняет фактическую дату окончания на текущую дату или _null_
- **GET /projects/getsprint/:id** - находит спринт по _id_
- **PUT /projects/favsprint/:id** - добавляет спринт, чей ид в юрл, в избранные пользователя, или убирает, если он там уже был
- **DELETE /projects/sprints/:id** - удаляет спринт по ид, указанному в юрл

### НовостьОчка

- **POST /news** - Добавляет новую новость, требует _title_(string),_subtitle_(string),_text_(string) в _body_, респонсит созданной новостью
- **GET /news/all** - Респонсит всеми новостями, отсортированными по дате создания
- **GET /news/:id** - Респонсит новостью, чей _id_ указан в юрл
- **DELETE /news/:id** - Удаляет новость, чей _id_ указан в юрл
- **PUT /news/:id** - Изменяет _title_,_subtitle_,_text_ новости, чей ид указан в юрл на новые, указанные в _body_

### предложения

- **POST /props** - добавить новое предложение, требует _title_,_text_ стрингом, респонсит стрингом
- **GET /props/all/likes** - респонсит всеми предложениями, отсортированными по лайкам
- **GET /props/all/date** - респонсит всеми предложениями, отсортированными по дате создания
- **PUT /props/like/:id** - лайкает/дизлайкает предложение по его ид в юрл
- **DELETE /props/:id** - удаляет предложение по его ид

### Восстановление ПароляОчка

- **PUT /users/passrec** - находит юзера по _email_ в body, создает _recCode_, сохраняет его в модель и отправляет пользователю на указанный email
- **GET /users/passrec/2** - проверяет введенный пользователем _recCode_ из бади, возвращает _recCode_ на всякий случай
- **PUT /users/passrec/3** - находит пользователя по _recCode_ из body, меняет его пароль на новый _password_ из body, удаляет старый _recCode_ из модели, зачем-то возвращает юзер айди
