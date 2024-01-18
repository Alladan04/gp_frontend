import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./OperationAddPage.scss"

//import { useFine } from "../../hooks/useFine";
import { useOperation } from '../../hooks/useOperation';
import { SubmitButton } from '../../components/Buttons/OperationButton';

const statuses: any = {
  active: "действует",
  removed: "удален",
};

const OperationAddPage = () => {
 
    const { createOperation } = useOperation();
    

    const [fileData, setFileData] = useState(null); // новое состояние для файла

    const navigate = useNavigate();
    const [submitSuccess, setSubmitSuccess] = useState(false);


    const [operationData, setOperationData] = useState({
        name: '',
        image: null, // для файла изображения используем null в качестве начального значения
        description: '',
        //price: '',
        status: 'active', // начальное состояние с текстовым значением
    });



    useEffect(() => {
        let timer: any;
        if (submitSuccess) {
            // Показать сообщение
            const successMessage = document.querySelector('.submit-success-message');
            if (successMessage) successMessage.classList.add('show');
    
            // Скрыть сообщение после 3 секунд
            timer = setTimeout(() => {
                if (successMessage) successMessage.classList.remove('show');
                setSubmitSuccess(false); // Сбросить состояние, чтобы позволить повторное появление в будущем
            }, 3000);
        }
    
        // Очистка таймера, если компонент размонтируется до завершения таймаута
        return () => timer && clearTimeout(timer);
    }, [submitSuccess]); 

    
    

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const update = (e.target.type === 'file') ? e.target.files[0] : value;
        setOperationData({ ...operationData, [name]: update });
    };

    const handleStatusChange = (e: any) => {
        // Меняем статус на текстовое представление для отображения
        setOperationData({ ...operationData, status: e.target.value });
    };


    const handleFileChange = (e: any) => {
        // Когда пользователь выбирает файл, сохраняем его в состояние
        const file = e.target.files[0];
        if(file) {
            setFileData(file); // сохраняем файл, а не url
            // Также обновите fineData, чтобы сохранить имя файла
            setOperationData({ ...operationData, image: file.name }); // предполагаем, что sendOperatiion использует имя файла
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        /*if (isNaN(operationData.price)) {
            alert("Цена должна быть числом");
            return;
        }*/
    
        const formData = new FormData();
    
        formData.append('name', operationData.name);
        formData.append('description', operationData.description);
        //formData.append('price', fineData.price);
        formData.append('status', statuses[operationData.status]);
    
        if (fileData) {
            formData.append('image', fileData);
            formData.append('img', fileData.name)
        }
    
        createOperation(formData).then(() => {
            setSubmitSuccess(true); // Only navigate or handle success if creation was successful
             navigate("/operation/edit"); 
        }).catch((error) => {
            // Handle error here, e.g., display a message to the user
            console.error("Failed to create fine:", error);
        });
    };
    
    

    const statusOptions = [
        { text: "действует", value: "active" },
        { text: "удалён", value: "removed" }
    ];

    return (
        <div className="container-1">
            <h1>Добавить Операцию</h1>
            {submitSuccess && <div className="submit-success-message">Операция добавлена</div>}
            <form onSubmit={handleSubmit} className="fine-form" encType="multipart/form-data">
                <label htmlFor="title
                ">Название</label>
                <input
                    type="text"
                    id="title"
                    name="name"
                    value={operationData.name}
                    onChange={handleChange}
                    required
                />

              
                {/* <label htmlFor="status">Статус</label>
                <select
                    className='form select'
                    id="status"
                    name="status"
                    value={fineData.status}
                    onChange={handleStatusChange}
                >
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select> */}

                <label htmlFor="image">Картинка</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                />

                <label htmlFor="text">Описание</label>
                <textarea
                    id="text"
                    name="description"
                    value={operationData.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <SubmitButton text = 'Добавить операцию'/>
            </form>
        </div>
    );
};

export default OperationAddPage;