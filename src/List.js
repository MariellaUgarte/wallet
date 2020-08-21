import React, {useEffect, Children} from 'react';
import styled from '@emotion/styled';

// "id": 1,
// "date": "2020-05-20T00:00:00.000Z",
// "payee": "Tanta",
// "description": "Codeable's dinner",
// "amount": 1000.0,
// "created_at": "2020-08-17T21:43:52.846Z",
// "updated_at": "2020-08-17T21:43:52.846Z",
// "account_id": 1,
// "category": "food_and_drinks"

const List = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

export default List;