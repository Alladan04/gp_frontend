import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import "./OperationEditPage.scss"
import { useOperation } from '../../hooks/useOperation';
import { SubmitButton } from '../../components/Buttons/OperationButton';

const statuses: any = {
  active: "действует",
  removed: "удалён",
};


const OperationEdit = () => {
    const { id } = useParams();
    const OperationId = id ? parseInt(id, 10) : null;
    const {operation, fetchOperation, changeOperation } = useOperation();
    const [fileData, setFileData] = useState(null); // новое состояние для файла
    const [operationData, setOperationData] = useState({
        name: '',
        image: null, // для файла изображения используем null в качестве начального значения
        description: '',
        //price: '',
        status: 'active', // начальное состояние с текстовым значением
    });
    const navigate = useNavigate()
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    

    useEffect(() => {
        // Загружаем данные только один раз
        if (OperationId !== null && !isDataFetched) {
            fetchOperation(OperationId).then((resp) => {
                // после получения данных устанавливаем isDataFetched в true
                setIsDataFetched(true);
               
                
      
            
            });
        }
    }, [OperationId, isDataFetched]);

    useEffect(() => {
        // Обновляем форму, когда данные fine изменились
        if (operation && isDataFetched) {
            setOperationData({
                name: operation.name|| '',
                image: operation.image || null,
                description: operation.description || '',             
                status: operation.status ? (operation.status === statuses.active ? 'действует' : 'удалён') : 'действует',
            });
            console.log("OperationData", operationData)
        }
    }, [operation, isDataFetched]);

    useEffect(() => {
        // Загружаем данные только один раз
        if (OperationId !== null) {
            fetchOperation(OperationId).then((resp) => {
                setIsDataFetched(true);
                setOperationData(resp.data)
           
            });
        }
    }, []);

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
        console.log("NewNameData ", update)
        console.log("name", name)
        console.log("value", value)
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
            setOperationData({ ...operationData, image: file.name }); // предполагаем, что sendFine использует имя файла
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('name', operationData.name);
        formData.append('description', operationData.description);
        //formData.append('price', fineData.price);
        //console.log("OperationData to submit", operationData)
        formData.append('status', operationData.status);
    
        if (fileData) {
            formData.append('image', fileData);
            formData.append('img', fileData.name)
            //console.log(fileData.name)
        }
    
        changeOperation(OperationId, formData).then(() => {
           navigate("/operation/edit");
            setSubmitSuccess(true);
        });
    };
    
    

    const statusOptions = [
        { text: "действует", value: "active" },
        { text: "удалён", value: "removed" }
    ];
    return (
        <div className="container-1">
            <h1>Редактировать Операцию</h1>
            {submitSuccess && <div className="submit-success-message">Операция отредактирована</div>}
            <form onSubmit={handleSubmit} className="fine-form" encType="multipart/form-data">
                <label htmlFor="name">Заголовок</label>
               

                <input
                
                    type="text"
                    id="name"
                    name="name"
                    value={operationData.name}
                    onChange={handleChange}
                />

               

                {/* <label htmlFor="status">Статус</label>
                <select
                    className="form select"
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

                <label htmlFor="description">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={operationData.description}
                    onChange={handleChange}
                ></textarea>

              <SubmitButton text = "Редактировать" ></SubmitButton>
            </form>
        </div>
    );
};

export default OperationEdit