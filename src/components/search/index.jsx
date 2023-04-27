import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from 'antd';
import { useState } from 'react';
import './style.scss';

const Search = () => {
    const [focus, setFocus] = useState(false);

    return (
        <div className={`search ${focus ? 'focus' : ''}`} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
            <div className="search__container">
                <div className="search__container__input">
                    <input type="search" placeholder="Tìm kiếm" />
                </div>
                <div className="search__container__button">
                    <Button type="button" shape="circle">
                        <MagnifyingGlassIcon className="icon" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Search;
