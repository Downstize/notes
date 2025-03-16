# 📝 Notes App

## 📌 Описание проекта
Приложение "Заметки" — это простой сервис для создания, редактирования, удаления и просмотра заметок. Бэкенд написан на **ASP.NET Core** с использованием **Entity Framework Core**, а фронтенд построен на **React.js**.

Проект реализует **архитектурные паттерны Repository и Unit of Work**, что позволяет организовать удобную работу с данными, минимизировать количество вызовов к базе данных и улучшить управляемость транзакциями.

## 🚀 Технологии
- **Backend:** ASP.NET Core, Entity Framework Core, PostgreSQL, Docker
- **Frontend:** React.js, Ant Design
- **Связь:** REST API, JSON
- **Хранилище:** PostgreSQL
- **Логирование:** встроенное логирование ASP.NET Core
- **Запуск:** Docker + Docker Compose

---

## 🛠️ Запуск проекта

### 1️⃣ **Клонирование репозитория**
```sh
git clone https://github.com/Downstize/notes.git
cd notes
```

### 2️⃣ **Запуск через Docker**
```sh
docker-compose up --build
```
---

## 🌍 Доступ к сервису

| Компонент | URL |
|-----------|--------------------------------|
| **Backend API (Swagger)** | `http://localhost:8080/swagger` |
| **Backend API (JSON)** | `http://localhost:8080/api/notes` |
| **Frontend** | `http://localhost:3000` |

---

## 🔗 API Эндпоинты

### 📌 **Заметки**
| Метод | URL | Описание |
|--------|----------------------------|------------------------------|
| **GET** | `/api/notes` | Получить список всех заметок |
| **GET** | `/api/notes/{id}` | Получить одну заметку по ID |
| **POST** | `/api/notes` | Создать новую заметку |
| **PUT** | `/api/notes/{id}` | Обновить заметку |
| **DELETE** | `/api/notes/{id}` | Удалить заметку |

**Пример запроса на создание заметки (`POST /api/notes`):**
```json
{
    "title": "Моя новая заметка",
    "content": "Это тестовое содержимое заметки."
}
```

---

## 📂 Структура проекта

```
📂 notes/  
├── 📁 NotesBackend/            # Бэкенд на ASP.NET Core  
│   ├── 📂 Controllers/         # API контроллеры  
│   ├── 📂 Data/                # Контекст БД и миграции  
│   ├── 📂 Model/               # Модели данных  
│   ├── 📂 Repository/          # Репозитории и Unit of Work  
│   ├── 📄 Program.cs           # Входная точка приложения  
│   ├── 🛠️ appsettings.json      # Конфигурация  
│  
├── 📁 notes-frontend/          # Фронтенд на React.js  
│   ├── 📂 src/                 # Исходники  
│   ├── 📂 public/              # Статика  
│   ├── 📄 package.json         # Зависимости  
│  
├── 🐳 docker-compose.yml       # Конфигурация Docker  
├── 📄 README.md                # Документация  
```

---

## 🛠 Разработчик
- **Вячеслав** - Backend/Архитектура/Frontend UI/UX

---

## 📝 Лицензия
Этот проект распространяется под лицензией MIT.
```
