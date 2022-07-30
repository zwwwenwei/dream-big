require 'grape'

class UnitApi < Grape::API

  desc 'Allow creation of a unit'
  params do
    requires :code, type: String, desc: 'The unit code'
    requires :name, type: String, desc: 'The unit name'
    requires :description, type: String, desc: 'The description of the unit'
  end
  post '/units' do
    unit_parameters = ActionController::Parameters.new(params)
      .permit(
        :code,
        :name,
        :description
      )

    # Auth...

    result = Unit.create!(unit_parameters)

    present result, with: Entities::UnitEntity
  end

  desc 'Allow updating of a unit'
  params do
    optional :code, type: String, desc: 'The unit code'
    optional :name, type: String, desc: 'The unit name'
    optional :description, type: String, desc: 'The description of the unit'
  end
  put '/units/:id' do
    unit_parameters = ActionController::Parameters.new(params)
      .permit(
        :code,
        :name,
        :description
      )

    # Auth

    result = Unit.find(params[:id])
    result.update! unit_parameters

    present result, with: Entities::UnitEntity
  end

  desc 'Delete the unit with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the unit to delete'
  end
  delete '/units/:id' do
    Unit.find(params[:id]).destroy!
    true
  end

  get '/units' do
    result = Unit.all

    present result, with: Entities::UnitEntity
  end
end