class SessionService {

    findAll = (key) => {
        return Array.from(JSON.parse(sessionStorage.getItem(key)) || []);
    }

    save = (key, data) => {
        const list = this.findAll(key);
        list.push(data);
        sessionStorage.setItem(key, JSON.stringify(list));
        return list;
    }

    delete = (key, data) => {
        const listFilter = this.findAll(key).filter(value => JSON.stringify(value) !== JSON.stringify(data));
        sessionStorage.setItem(key, JSON.stringify(listFilter));
        return listFilter;
    }

    deleteBy = (key, value, param) => {
        const listFilter = this.findAll(key).filter(item => item[param] !== value);
        sessionStorage.setItem(key, JSON.stringify(listFilter));
        return listFilter;
    }

    findAllBy = (key, value, param) => {
        return this.findAll(key).filter(item => item[param] === value);
    }

    findBy = (key, value, param) => {
        return this.findAll(key).find(item => item[param] === value);
    }

}

export default SessionService;