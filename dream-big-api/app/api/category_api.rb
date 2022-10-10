require 'grape'

class CategoryApi < Grape::API
  desc 'Allow retrieval of a single category'
  get '/category/:id' do
    category_parameters = ActionController::Parameters.new(params)
      .permit(
        :id
      )

    # Auth

    result = Category.find(params[:id])
    present result, with: Entities::CategoryEntity
  end

  desc 'Allow creation of a category'
  params do
  
    requires :name, type: String, desc: 'Category name'
    requires :description, type: String, desc: 'The description of the category'
    requires :weight_values_id, type: Integer, desc: 'default weight for category'
  end
  post '/category' do
    category_parameters = ActionController::Parameters.new(params)
      .permit(
        :name,
        :description,
        :weight_values_id
      )

    # Auth...

    result = Category.create!(category_parameters)

    present result, with: Entities::CategoryEntity
  end

  desc 'Allow updating of a categories'
  params do
    
    optional :name, type: String, desc: 'The categoryr name'
    optional :description, type: String, desc: 'The description of the category'
    optional :weight_values_id, type: Integer, desc: 'default weight for category'
  end
  put '/category/:id' do
    category_parameters = ActionController::Parameters.new(params)
      .permit(
        :name,
        :description,
        :weight_value_id
        #Ex:- :default =>''
      )

    # Auth

    result = Category.find(params[:id])
    result.update! category_parameters

    present result, with: Entities::CategoryEntity
  end

  desc 'Delete the category with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the category to delete'
  end
  delete '/category/:id' do
    Category.find(params[:id]).destroy!
    true
  end

  get '/category' do
    result = Category.all

    present result, with: Entities::CategoryEntity
  end
end