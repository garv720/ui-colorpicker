class Api::V1::ColorsController < ApplicationController
  
  def index
  	colors = Color.all.order(created_at: :DESC)
  	render json: colors
  end

  def create
  	color = Color.create!(color_params)
    if color
      render json: color
    else
      render json: color.errors
    end
  end

  def show
    if color
      render json: color
    else
      render json: color.errors
    end
  end

  def destroy
    color&.destroy
    render json: { message: 'Color deleted!' }
  end

  def color_params
    params.permit(:name, :hex_code)
  end
end
