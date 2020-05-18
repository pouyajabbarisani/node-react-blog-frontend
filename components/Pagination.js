const Pagination = (props) => {

   // const [whiteButtonStyle, setWhiteButtonStyle] = useState('pagination-is-White-button')

   const PaginationLoader = () => {
      if (typeof props.currentPage != 'undefined' || props.currentPage != '' || props.currentPage != 0) {
         if (props.resultCount && typeof props.resultCount != 'undefined' && props.resultCount > 0) {
            if (props.resultCount > props.resultPerPage) {

               let first = (props.currentPage > 2) ? <button onClick={(e) => props.getNewPage(1)}>First Page</button> : '';
               let before = (props.currentPage > 1) ? <button onClick={(e) => props.getNewPage(props.currentPage - 1)}>Previous Page</button> : '';

               let pages = [];
               let haveBefore = '';
               let haveAfter = '';

               if (props.currentPage < 5) {
                  haveBefore = '';
                  if (Math.floor(props.resultCount / props.resultPerPage) < 7) {
                     for (let i = 0; i < Math.floor(props.resultCount / props.resultPerPage) + 1; i++) {
                        pages.push(<button className={(props.currentPage == i + 1) ? 'pagination-btn-active' : ''} onClick={(e) => props.getNewPage(i + 1)} key={i + 1}><span>{i + 1}</span></button>)
                     }
                  }
                  else {
                     for (let i = 0; i < 7; i++) {
                        pages.push(<button className={(props.currentPage == i + 1) ? 'pagination-btn-active' : ''} onClick={(e) => props.getNewPage(i + 1)} key={i + 1}><span>{i + 1}</span></button>)
                     }
                  }
                  if (Math.floor(props.resultCount / props.resultPerPage) + 1 > 7) {
                     haveAfter = <span>...</span>;
                  }
               }
               else if (props.currentPage > Math.floor(props.resultCount / props.resultPerPage) - 2) {
                  if (Math.floor(props.resultCount / props.resultPerPage) - 6 > 1) {
                     haveBefore = <span>...</span>;
                  }

                  for (let i = Math.floor(props.resultCount / props.resultPerPage) - 6; i < Math.floor(props.resultCount / props.resultPerPage) + 1; i++) {
                     pages.push(<button className={(props.currentPage == i + 1) ? 'pagination-btn-active' : ''} onClick={(e) => props.getNewPage(i + 1)} key={i + 1}><span>{i + 1}</span></button>)
                  }
                  haveAfter = '';
               }
               else if (props.currentPage >= 5) {
                  haveBefore = <span>...</span>;
                  for (let i = props.currentPage - 4; i < props.currentPage + 3; i++) {
                     pages.push(<button className={(props.currentPage == i + 1) ? 'pagination-btn-active' : ''} onClick={(e) => props.getNewPage(i + 1)} key={i + 1}><span>{i + 1}</span></button>)
                  }
                  if (Math.floor(props.resultCount / props.resultPerPage) + 1 > props.currentPage + 3) {
                     haveAfter = <span>...</span>;
                  }
               }

               let after = (props.currentPage < Math.floor(props.resultCount / props.resultPerPage) + 1) ? <button onClick={(e) => props.getNewPage(props.currentPage + 1)}>Last Page</button> : '';
               let last = (props.currentPage < Math.floor(props.resultCount / props.resultPerPage)) ? <button onClick={(e) => props.getNewPage(Math.floor(props.resultCount / props.resultPerPage) + 1)}>Next Page</button> : '';

               return (
                  <div className={"pagination-container"}>
                     {first}
                     {before}

                     {haveBefore}
                     {pages}
                     {haveAfter}

                     {after}
                     {last}
                  </div>
               );
            }
            else {
               return (
                  <span className="display-none"></span>
               )
            }
         }
         else {
            return (
               <span className="display-none"></span>
            )
         }
      }
      else {
         return ('Page 1 of 1');
      }
   }

   return (
      <div>
         {PaginationLoader()}
      </div>
   )

}

export default Pagination;