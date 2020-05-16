import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { withApollo } from '../lib/apollo'
import { useQuery } from '@apollo/react-hooks'
import Select from 'react-select';


const GET_CATEGORIES = gql`
{
   categories{
      title
      slug
   }
}`

const SelectCategory = props => {
   const { loading: getCategoriesLoading, error: getCategoriesError, data: getCategoriesData } = useQuery(GET_CATEGORIES);
   const [categories, setCategories] = useState([]);
   const [selectedCategories, setSelectedCategories] = useState([]);

   useEffect(() => {
      if (getCategoriesData && getCategoriesData.categories) {
         const initialCategories = []
         for (let singleCategory of getCategoriesData.categories) {
            initialCategories.push({ label: singleCategory.title, value: singleCategory.slug })
         }
         setCategories(initialCategories)
      }
   }, [getCategoriesData])

   function labelHandler() {
      if (props.label) {
         return <label className="input-label">{props.label}</label>
      }
   }

   return (
      <div className={props.fullWidth ? 'select-category-container fullwidth-input-container' : 'select-category-container'}>
         {labelHandler()}
         {!getCategoriesLoading && categories && <Select
            options={categories || []}
            onChange={(selected) => {
               setSelectedCategories(selected || []);
               if (selected && selected.length) {
                  const newSelectedArray = [];
                  for (let singleSelected of selected) {
                     newSelectedArray.push(singleSelected.value);
                  }
                  props.setFormFields({ ...props.formFields, categories: newSelectedArray })
               }
               else {
                  props.formFields ? props.setFormFields({ ...props.formFields, categories: [] }) : props.setFormFields({ categories: [] })
               }
            }}
            value={selectedCategories || []}
            isMulti={true} />}
      </div>
   )
}

export default withApollo({ ssr: true })(SelectCategory)