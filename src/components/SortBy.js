export default function SortBy(props) {
  const { setSortBy, setOrder } = props;

  return (
    <div>
      Sort by{" "}
      <select
        onChange={(event) => setSortBy(event.target.value)}
        name="sort by"
        id="sort-by"
      >
        <option value="created_at"> Date </option>
        <option value="votes"> Votes </option>
        <option value="comment_count"> Comment count </option>
      </select>
      <select
        onChange={(event) => setOrder(event.target.value)}
        name="sort by order"
        id="sort-by-order"
      >
        <option value="desc"> Descending </option>
        <option value="asc"> Ascending </option>
      </select>
    </div>
  );
}
