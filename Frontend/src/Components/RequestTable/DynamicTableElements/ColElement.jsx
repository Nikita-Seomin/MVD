export const COLUMNS_GROUP = [
    {
        Header: 'Номер по порядку',
        accessor: 'ReqTable'
    },
    {
        Header: 'Кусп направившего территориального округа',
        accessor: 'ReqCUSP',
        columns:
        [
            { Header: '№' , accessor: 'ReqCUSP№' },
            { Header: 'дата' , accessor: 'ReqCUSPData' }
        ]
    },
    {
        Header: 'Субъект РФ' ,
        accessor: 'Region'
    },
    {
        Header: 'Территориальный округ (подразделение), в который направлен матерал проверки' ,
        accessor: 'DivisionWhere'
    },
    {
        Header: '№ талона-уведомления (по территориальности)' ,
        accessor: 'couponNum'
    },
    {
        Header: 'Сопроводительное письмо к материалу отправленному по территориальности' ,
        accessor: 'reqLetter',
        columns:
            [
                { Header: '№' , accessor: 'reqLetter№' },
                { Header: 'дата' , accessor: 'reqLetterData' }
            ]
    },
    {
        Header: 'Дата отправки по реестру подразделения ДиР' ,
        accessor: 'dataReqOnRegistry',
        columns:
            [
                { Header: '№ реестра' , accessor: 'dataReqOnRegistry№' },
                { Header: 'дата' , accessor: 'dataReqOnRegistryData' }
            ]
    },
    {
        Header: 'В территориальный орган (подразделение) направлен запрос',
        accessor: 'RequestTo',
        columns:
            [
                { Header: 'исходный №' , accessor: 'RequestTo№' },
                { Header: 'дата' , accessor: 'RequestToData' }
            ]
    },
]