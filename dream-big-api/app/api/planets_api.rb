
require 'grape'

class PlanetsApi < Grape::API

  desc 'Allow creation of a planet skin'
  params do
    requires :name, type: String, desc: 'Name of the Planet Object'
    requires :status, type: String, desc: 'planet status'
    requires :star_system_id, type: Integer, desc: 'the id for the star system this planet belongs to'
    # requires :skin_id, type: Integer, desc: 'ID of the Planet Skin'
    requires :category_id, type: Integer, desc: 'Category of the plannet'
  end
  post '/planet' do
    planet_parameters = ActionController::Parameters.new(params)
      .permit(
        :name, 
        :status,
        :star_system_id,
        # :skin_id,
        :category_id
      )

    # Auth...

    result = Planet.create!(planet_parameters)

    present result, with: Entities::PlanetsEntity
  end

  desc 'Allow updating of a Planet'
  params do
    
    optional :name, type: String, desc: 'Name of the Planet Object'
    optional :status, type: String, desc: 'planet status'
    optional :star_system_id, type: Integer, desc: 'the id for the star system this planet belongs to'
    # optional :skin_id, type: Integer, desc: 'ID of the Planet Skin'
    optional :category_id, type: Integer, desc: 'Category of the plannet'
  end
  put '/planet/:id' do
    planet_parameters = ActionController::Parameters.new(params)
      .permit(
        :name, 
        :status,
        :star_system_id,
        # :skin_id,
        :category_id
      )

    # Auth

    result = Planet.find(params[:id])
    result.update! planet_parameters

    present result, with: Entities::PlanetsEntity
  end

  desc 'Delete the planet with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the planet to delete'
  end
  delete '/planet/:id' do
    Planet.find(params[:id]).destroy!
    true
  end


end
