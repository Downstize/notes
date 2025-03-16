import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Popconfirm, message, Tooltip, Button } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';

function NotesList() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке заметок", error);
            message.error("Ошибка при загрузке заметок");
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/notes/${id}`);
            setNotes(notes.filter(note => note.id !== id));
            message.success("Заметка удалена");
        } catch (error) {
            console.error("Ошибка при удалении заметки", error);
            message.error("Ошибка при удалении заметки");
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 60,
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            width: 200,
        },
        {
            title: 'Содержание',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
            ellipsis: true,
            width: 300,
        },
        {
            title: 'Действия',
            key: 'actions',
            align: 'center',
            width: 120,
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <Tooltip title="Просмотр">
                        <Link to={`/note/${record.id}`}>
                            <EyeOutlined style={{ fontSize: '18px', color: '#1890ff' }} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Редактировать">
                        <Link to={`/edit/${record.id}`}>
                            <EditOutlined style={{ fontSize: '18px', color: '#52c41a' }} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <Popconfirm
                            title="Удалить заметку?"
                            description="Вы уверены, что хотите удалить эту заметку?"
                            okText="Да"
                            cancelText="Нет"
                            onConfirm={() => deleteNote(record.id)}
                        >
                            <DeleteOutlined style={{ fontSize: '18px', color: '#ff4d4f', cursor: 'pointer' }} />
                        </Popconfirm>
                    </Tooltip>
                </div>
            ),
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            width: 180,
            render: (date) => date ? dayjs(date).format("DD-MM-YYYY HH:mm") : "Не указано",
        },
        {
            title: 'Дата редактирования',
            dataIndex: 'modifiedAt',
            key: 'modifiedAt',
            align: 'center',
            width: 180,
            render: (date) => date ? dayjs(date).format("DD-MM-YYYY HH:mm") : "Не редактировалось",
        },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
                <h2>Список заметок</h2>
                <Link to="/create">
                    <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: '16px' }}>
                        Добавить новую заметку
                    </Button>
                </Link>
                <Table 
                    dataSource={notes} 
                    columns={columns} 
                    rowKey="id" 
                    loading={loading} 
                    bordered 
                    pagination={{ pageSize: 8 }}
                />
            </div>
        </div>
    );
}

export default NotesList;
