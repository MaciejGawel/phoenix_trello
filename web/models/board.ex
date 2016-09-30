defmodule PhoenixTrello.Board do
  use PhoenixTrello.Web, :model

  alias __MODULE__

  @derive {Poison.Encoder, only: [:id, :name, :user]}

  schema "boards" do
    field :name, :string
    belongs_to :user, PhoenixTrello.User

    has_many :user_boards, PhoenixTrello.UserBoard
    has_many :members, through: [:user_boards, :user]
    has_many :lists
    
    timestamps()
  end

  @required_fields ~w(name user_id)
  @optional_fields ~w()

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
