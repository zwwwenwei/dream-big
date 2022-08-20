require 'grape'

class StarSkinApi < Grape::API

  desc 'Allow creation of a planet skin'
  params do
  
    requires :asset, type: String, desc: 'Image url'
    requires :color type: String, desc: 'stars color'
  end
  post '/starskin' do
    star_skin_parameters = ActionController::Parameters.new(params)
      .permit(
        :asset,
        :color
      )

    # Auth...

    result = StarSkin.create!(star_skin_parameters)

    present result, with: Entities::StarSkinEntity
  end

  desc 'Allow updating of a Star Skins'
  params do
    
    optional :asset, type: String, desc: 'Image URL'
    optional :color, type: String, desc: 'Color of star'
  end
  put '/starskin/:id' do
    star_skin_parameters = ActionController::Parameters.new(params)
      .permit(
        :asset,
        :color
        #Ex:- :default =>''
      )

    # Auth

    result = StartSkin.find(params[:id])
    result.update! star_skin_parameters

    present result, with: Entities::StarSkinEntity
  end

  desc 'Delete the star with the indicated id'
  params do
    requires :id, type: Integer, desc: 'The id of the star to delete'
  end
  delete '/starskin/:id' do
    StarSkin.find(params[:id]).destroy!
    true
  end

  get '/starskin' do
    result = StarSkin.all

    present result, with: Entities::StarSkinEntity
  end
end