import React, { useEffect, useState, memo } from 'react';

function Category(props) {
    var kategoria = props.kategoria;

    return (
        <div>
            <br/>
            <select class= "custom-select custom-select-lg mb-3">
                <option value="Valitse kategoria">Valitse kategoria</option>
                <option value="1">Rokotteet</option>
                <option value="2">Työvälineet</option>
                <option value="3">Muut</option>
            </select>

        </div>
    );
}
export default Category;