export default (filter, data) =>
    data.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
