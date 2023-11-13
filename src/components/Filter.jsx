function Filter({ value, onChangeFilter }) {
  return (
    <div>
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={onChangeFilter} />
      </label>
    </div>
  );
}

export default Filter;