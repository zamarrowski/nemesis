export default function () {
  let query_string = {}
  let query = window.location.search.substring(1)
  let vars = query.split("&")
  for (let i=0; i < vars.length; i++) {
    let pair = vars[i].split("=")
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1])
    } else if (typeof query_string[pair[0]] === "string") {
      let arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ]
      query_string[pair[0]] = arr

    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]))
    }
  }
  return query_string
};
