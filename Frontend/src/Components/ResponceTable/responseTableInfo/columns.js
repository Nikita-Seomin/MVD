

    const COLUMNS = [
    {
        Header: 'Кусп направившего территориального округа',
        id: 'ReqCUSP',
        columns:
            [
                {
                    Header: '№',
                    accessor: 'whoSentCUSP'
                },
                {
                    Header: 'дата',
                    accessor: 'WhoSentCUSPDate'
                }
            ]
    },
    {
        Header: 'Субъект РФ',
        accessor: 'region'
    },
    {
        Header: 'Территориальный округ (подразделение), в который направлен матерал проверки',
        accessor: 'whereSent'
    },
    {
        Header: '№ талона-уведомления (по территориальности)',
        accessor: 'couponNum'
    },
    {
        Header: 'Сопроводительное письмо к материалу отправленному по территориальности',
        id: 'reqLetter',
        columns:
            [
                {
                    Header: '№',
                    accessor: 'letterSent'
                },
                {
                    Header: 'дата',
                    accessor: 'letterSentDate'
                }
            ]
    },
    {
        Header: 'Дата отправки по реестру подразделения ДиР',
        id: 'dataReqOnRegistry',
        columns:
            [
                {
                    Header: '№ реестра',
                    accessor: 'dataSentOnRegistryNum'
                },
                {
                    Header: 'дата',
                    accessor: 'dataSentOnRegistryDate'
                }
            ]
    },
    {
        Header: 'В территориальный орган (подразделение) направлен запрос',
        id: 'RequestTo',
        columns:
            [
                {
                    Header: 'исходный №',
                    accessor: 'requestToNum'
                },
                {
                    Header: 'дата',
                    accessor: 'requestToDate'
                }
            ]
    }
]

export default COLUMNS